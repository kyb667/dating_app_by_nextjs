import { getDriver } from "@/lib/db/neo4j";
import { CONFIG } from "@/lib/config";

// 会員登録
export const createPerson = async ({ body }: { body: any }) => {
  console.log("createPerson start");
  const session = getDriver().session({ database: "neo4j" });
  try {
    const findData = await select({ session, body });
    console.log("findData : ", findData);
    if (findData.length > CONFIG.COMMON.ZERO) {
      console.log("既に登録されている");
      return CONFIG.STATUS_CODE.ERROR;
    }

    const code = await create({ session, body });

    session.close();
    return code;
  } catch (error: any) {
    session.close();
    return CONFIG.STATUS_CODE.ERROR;
  } finally {
    console.log("createPerson end");
  }
};

export const deletePerson = async ({ body }: { body: any }) => {
  console.log("deletePerson");
  const session = getDriver().session({ database: "neo4j" });
  let code = await session
    .run(
      `
      MERGE (p:Person {name: $userId}) 
      DETACH DELETE p
      `,
      body,
    )
    .then((res: any) => {
      console.log(res);
    })
    .catch((error: any) => {
      console.error(error);
      return CONFIG.STATUS_CODE.ERROR;
    });
  return code;
};

export const create = async ({
  session,
  body,
}: {
  session: any;
  body: any;
}) => {
  console.log("create start");
  try {
    let code = await session
      .run(
        `
      MERGE (p:Person {name: $userId}) 
          ON CREATE set p.userId = $userId, 
                        p.userName = $userName, 
                        p.password = $userPassword
      `,
        body,
      )
      .then((result: any) => {
        return CONFIG.STATUS_CODE.SUCCESS;
      })
      .catch((error: any) => {
        console.error(error);
        return CONFIG.STATUS_CODE.ERROR;
      });

    console.log("create code : ", code);

    if (code === CONFIG.STATUS_CODE.SUCCESS) {
      const relation = makeRelationBody({ body });
      const codeList = await Promise.all(
        relation.map((r) => createRelation({ body: r })),
      )
        .then((result) => {
          return result;
        })
        .catch((e) => {
          console.error(e);
          return [CONFIG.STATUS_CODE.ERROR];
        });

      if (CONFIG.STATUS_CODE.ERROR === Math.max(...codeList)) {
        code = CONFIG.STATUS_CODE.ERROR;
        const _ = await deletePerson({ body });
      }
    }
    return code;
  } catch (error) {
    return CONFIG.STATUS_CODE.ERROR;
  } finally {
    console.log("create end");
  }
};

// 登録されている会員なのかチェック
export const select = async ({
  session,
  body,
}: {
  session: any;
  body: any;
}) => {
  console.log("select start");
  try {
    const findData = await session
      .run(
        `
      MATCH (p:Person)
      WHERE p.name = $userId
      RETURN p
      `,
        body,
      )
      .then((result: any) => {
        // console.log(result.records);
        return result.records;
      })
      .catch((error: any) => {
        console.error(error);
        return [];
      });
    // console.log(result.records[0]);
    // console.log(result.records[0].get(0));
    // console.log(result.records[0].get(0).properties.name);
    return findData;
  } catch (error) {
    return [];
  }
};

/* createRelationのbodyの例
  {
    to : Person
    toName : 取得したいnodeのname
    from : Community or Age or Salay
    fromName : 取得したいnodeのname
    relationName : relationName
  }
*/
export const createRelation = async ({ body }: { body: any }) => {
  console.log("createRelation start");
  console.log(body);
  try {
    const session = getDriver().session({ database: "neo4j" });

    const sql = `
      MATCH (a: ${body.to}), (b: ${body.from}) 
      WHERE a.name = '${body.toName}' AND b.name = '${body.fromName}'
      CREATE (a)-[: ${body.relationName}]->(b)
      RETURN a,b 
    `;
    console.log(sql);
    const data = await session
      .run(sql)
      .then((result: any) => {
        // console.log(result.records);
        return CONFIG.STATUS_CODE.SUCCESS;
      })
      .catch((error: any) => {
        console.error(error);
        return CONFIG.STATUS_CODE.ERROR;
      });
    return data;
  } catch (error) {
    return CONFIG.STATUS_CODE.ERROR;
  } finally {
    console.log("createRelation end");
  }
};

const makeRelationBody = ({ body }: { body: any }) => {
  console.log("makeRelationBody");
  // console.log(body);
  const relation = [];

  for (const hobby of body.hobby) {
    let commu = {
      to: CONFIG.DB.NODE.Person,
      toName: body.userId,
      from: CONFIG.DB.NODE.Community,
      fromName: hobby,
      relationName: CONFIG.DB.Relationships.Person.Community,
    };
    relation.push(commu);
  }

  let salaly = {
    to: CONFIG.DB.NODE.Person,
    toName: body.userId,
    from: CONFIG.DB.NODE.Salaly,
    fromName: body.salaly,
    relationName: CONFIG.DB.Relationships.Person.Salaly,
  };
  relation.push(salaly);

  let n: number = Number(Number(Number(body.age) / 10) * 10);
  let calc: string = n.toString();
  let age = {
    to: CONFIG.DB.NODE.Person,
    toName: body.userId,
    from: CONFIG.DB.NODE.Age,
    fromName: `${calc}代`,
    relationName: CONFIG.DB.Relationships.Person.Age,
  };
  relation.push(age);

  console.log(relation);
  return relation;
};
