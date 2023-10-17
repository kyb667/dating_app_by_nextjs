import { getDriver } from "@/lib/db/neo4j";
import { CONFIG } from "@/lib/config";

// interface returnType {
//   code: number;
//   data: any[];
// }

export const selectPerson = async ({ body }: { body: any }) => {
  console.debug("selectPerson start");
  try {
    const salalyData = await selectPersonBySalaly({ body: body });
    const communityData = await selectPersonByCommunity({
      body: body,
    });
    const ageData = await selectPersonByAge({ body: body });
    const loveData = await selectPersonByLove({ body: body });

    let num1: number = salalyData.code;
    let num2: number = communityData.code;
    let num3: number = ageData.code;
    let num4: number = loveData.code;

    const codeList: number[] = [num1, num2, num3, num4];

    let personList: any = {};
    if (Math.max(...codeList) === CONFIG.STATUS_CODE.ERROR) {
      return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
    } else {
      for (const data of [ageData.data, communityData.data, salalyData.data]) {
        personList = Object.assign([], personList, data);
      }
      for (let userId in personList) {
        if (loveData.data.includes(userId)) {
          personList[userId]["love"] = true;
        } else {
          personList[userId]["love"] = false;
        }
      }
    }
    return {
      data: Object.values(personList),
      code: CONFIG.STATUS_CODE.SUCCESS,
    };
  } catch (error) {
    return { data: [], code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectPerson end");
  }
};

export const selectPersonBySalaly = async ({ body }: { body: any }) => {
  console.debug("selectPersonBySalaly start");
  try {
    const session = getDriver().session({ database: "neo4j" });

    const sql = `
      match (p: ${CONFIG.DB.NODE.Person} {name : "${body.userId}"})-[:${CONFIG.DB.Relationships.Person.Salaly}]->(salaly)<-[:${CONFIG.DB.Relationships.Person.Salaly}]-(newP)
      call {
          with newP
          match (newP)-[:${CONFIG.DB.Relationships.Person.Community}]->(community)
          return community as community
      }
      call {
          with newP
          match (newP)-[:${CONFIG.DB.Relationships.Person.Age}]->(age)
          return age as age
      }
      return p, salaly, newP, community, age
    `;
    //   `
    // match (p:Person {name : "test4"})-[:followSalaly]->(salaly)<-[:followSalaly]-(newP)
    // call {
    //     with newP
    //     match (newP)-[:followCommunity]->(community)
    //     return community as community
    // }
    // call {
    //     with newP
    //     match (newP)-[:followAge]->(age)
    //     return age as age
    // }
    // return p, salaly, newP, community, age
    // `,
    //   body,

    const data = await session
      .run(sql)
      .then((result: any) => {
        return {
          data: makeRecord({ records: result.records }),
          code: CONFIG.STATUS_CODE.SUCCESS,
        };
      })
      .catch((error: any) => {
        console.error(error);
        return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
      });
    return data;
  } catch (error) {
    return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectPersonBySalaly end");
  }
};

export const selectPersonByLove = async ({ body }: { body: any }) => {
  console.debug("selectPersonByLove start");
  try {
    const session = getDriver().session({ database: "neo4j" });

    const sql = `
      match (p: ${CONFIG.DB.NODE.Person} {name : "${body.userId}"})-[:${CONFIG.DB.Relationships.Person.Person.love}]->(newP)
      return newP
    `;
    //   `
    // match (p:Person {name : "test4"})-[:followLove]->(newP)
    // return p, newP
    // `,
    //   body,

    const data = await session
      .run(sql)
      .then((result: any) => {
        console.debug(result.records);

        let data = [];

        for (const iterator of result.records) {
          const newP = iterator.get("newP").properties;
          data.push(newP.name);
        }
        return {
          data: data,
          code: CONFIG.STATUS_CODE.SUCCESS,
        };
      })
      .catch((error: any) => {
        console.error(error);
        return { data: [], code: CONFIG.STATUS_CODE.ERROR };
      });
    return data;
  } catch (error) {
    return { data: [], code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectPersonByLove end");
  }
};

export const selectPersonByCommunity = async ({ body }: { body: any }) => {
  console.debug("selectPersonCommunity start");
  try {
    const session = getDriver().session({ database: "neo4j" });

    const sql = `
    match (p: ${CONFIG.DB.NODE.Person} {name : "${body.userId}"})-[:${CONFIG.DB.Relationships.Person.Community}]->(community)<-[:${CONFIG.DB.Relationships.Person.Community}]-(newP)
    call {
        with newP
        match (newP)-[:${CONFIG.DB.Relationships.Person.Salaly}]->(salaly)
        return salaly as salaly
    }
    call {
        with newP
        match (newP)-[:${CONFIG.DB.Relationships.Person.Age}]->(age)
        return age as age
    }
    return p, salaly, newP, community, age
    `;
    // `
    //     match (p:Person {name : "test4"})-[:followCommunity]->(community)<-[:followCommunity]-(newP)
    //     call {
    //         with newP
    //         match (newP)-[:followSalaly]->(salaly)
    //         return salaly as salaly
    //     }
    //     call {
    //         with newP
    //         match (newP)-[:followAge]->(age)
    //         return age as age
    //     }
    //     return p, salaly, newP, community, age
    //   `,
    //     body,
    const data = await session
      .run(sql)
      .then((result: any) => {
        return {
          data: makeRecord({ records: result.records }),
          code: CONFIG.STATUS_CODE.SUCCESS,
        };
      })
      .catch((error: any) => {
        console.error(error);
        return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
      });
    return data;
  } catch (error) {
    return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectPersonCommunity end");
  }
};

export const selectPersonByAge = async ({ body }: { body: any }) => {
  console.debug("selectPersonByAge start");
  try {
    const sql = `
    match (p: ${CONFIG.DB.NODE.Person} {name : "${body.userId}"})-[:${CONFIG.DB.Relationships.Person.Age}]->(age)<-[:${CONFIG.DB.Relationships.Person.Age}]-(newP)
    call {
        with newP
        match (newP)-[:${CONFIG.DB.Relationships.Person.Salaly}]->(salaly)
        return salaly as salaly
    }
    call {
        with newP
        match (newP)-[:${CONFIG.DB.Relationships.Person.Community}]->(community)
        return community as community
    }
    return p, salaly, newP, community, age
    `;
    const session = getDriver().session({ database: "neo4j" });
    //   `
    //   match (p:Person {name : "test4"})-[:followAge]->(age)<-[:followAge]-(newP)
    //   call {
    //       with newP
    //       match (newP)-[:followSalaly]->(salaly)
    //       return salaly as salaly
    //   }
    //   call {
    //       with newP
    //       match (newP)-[:followCommunity]->(community)
    //       return community as community
    //   }
    //   return p, salaly, newP, community, age
    // `,
    //   body,
    const data = await session
      .run(sql)
      .then((result: any) => {
        return {
          data: makeRecord({ records: result.records }),
          code: CONFIG.STATUS_CODE.SUCCESS,
        };
      })
      .catch((error: any) => {
        console.error(error);
        return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
      });
    return data;
  } catch (error) {
    return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectPersonByAge end");
  }
};

const makeRecord = ({ records }: { records: any }) => {
  console.debug("makeRecord start");

  const personList: any = {};

  for (const iterator of records) {
    const newP = iterator.get("newP").properties;
    const community = iterator.get("community").properties;
    const age = iterator.get("age").properties;
    const salaly = iterator.get("salaly").properties;

    if (newP.name in personList) {
      if (community.name in personList[newP.name].community) {
        continue;
      } else {
        personList[newP.name].community.push(community.name);
      }
      continue;
    }

    let data = {
      userId: newP.userId,
      userName: newP.userName,
      community: [community.name],
      age: age.name,
      salaly: salaly.name,
    };

    personList[newP.name] = data;
  }
  console.debug(personList);
  console.debug("makeRecord end");
  return personList;
};

// --------------------------------------------------------------------------------------

export const selectPersonAll = async () => {
  console.debug("selectPersonAll start");
  try {
    const data = await selectPersonByUser();

    let personList: any = {};
    if (data.code === CONFIG.STATUS_CODE.ERROR) {
      return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
    } else {
      personList = data.data;
    }
    return {
      data: Object.values(personList),
      code: CONFIG.STATUS_CODE.SUCCESS,
    };
  } catch (error) {
    return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectPersonAll end");
  }
};

export const selectPersonByUser = async () => {
  console.debug("selectPersonByUser start");
  try {
    const session = getDriver().session({ database: "neo4j" });

    const sql = `
      match (newP: ${CONFIG.DB.NODE.Person} )
      call {
        with newP
        match (newP)-[:${CONFIG.DB.Relationships.Person.Salaly}]->(salaly)
        return salaly as salaly
      }
      call {
          with newP
          match (newP)-[:${CONFIG.DB.Relationships.Person.Community}]->(community)
          return community as community
      }
      call {
          with newP
          match (newP)-[:${CONFIG.DB.Relationships.Person.Age}]->(age)
          return age as age
      }
      return newP, salaly, community, age
    `;
    const data = await session
      .run(sql)
      .then((result: any) => {
        return {
          data: makeRecord({ records: result.records }),
          code: CONFIG.STATUS_CODE.SUCCESS,
        };
      })
      .catch((error: any) => {
        console.error(error);
        return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
      });
    return data;
  } catch (error) {
    return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectPersonByUser end");
  }
};

// --------------------------------------------------------------------------------------

export const selectLoveUser = async ({ body }: { body: any }) => {
  console.debug("selectLoveUser start");
  try {
    const salalyData = await selectPersonBySalaly({ body: body });
    const communityData = await selectPersonByCommunity({
      body: body,
    });
    const ageData = await selectPersonByAge({ body: body });
    const loveData = await selectPersonByLove({ body: body });

    let num1: number = salalyData.code;
    let num2: number = communityData.code;
    let num3: number = ageData.code;
    let num4: number = loveData.code;

    const codeList: number[] = [num1, num2, num3, num4];

    let personList: any = {};
    let returnList: any = {};
    if (Math.max(...codeList) === CONFIG.STATUS_CODE.ERROR) {
      return { data: [], code: CONFIG.STATUS_CODE.ERROR };
    } else {
      for (const data of [ageData.data, communityData.data, salalyData.data]) {
        personList = Object.assign({}, personList, data);
      }

      for (let userId in personList) {
        if (loveData.data.includes(userId)) {
          personList[userId]["love"] = true;

          returnList[userId] = { ...personList[userId] };
        }
      }
    }
    return {
      data: Object.values(returnList),
      code: CONFIG.STATUS_CODE.SUCCESS,
    };
  } catch (error) {
    return { data: [], code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectLoveUser end");
  }
};

// --------------------------------------------------------------------------------------

export const selectUserInfo = async (userId: string) => {
  console.debug("selectUserInfo start");
  console.debug(userId);
  try {
    const salalyData = await selectUserInfoBySalaly(userId);
    const communityData = await selectUserInfoByCommunity(userId);
    const ageData = await selectUserInfoByAge(userId);

    console.debug(salalyData);
    console.debug(communityData);
    console.debug(ageData);

    let num1: number = salalyData.code;
    let num2: number = communityData.code;
    let num3: number = ageData.code;

    const codeList: number[] = [num1, num2, num3];

    let personList: any = {};
    let returnList: any = {};
    if (Math.max(...codeList) === CONFIG.STATUS_CODE.ERROR) {
      return { data: [], code: CONFIG.STATUS_CODE.ERROR };
    } else {
      returnList = {
        salaly: salalyData.data.name,
        community: communityData.data,
        ageData: ageData.data.name,
      };
    }
    return {
      data: returnList,
      code: CONFIG.STATUS_CODE.SUCCESS,
    };
  } catch (error) {
    return { data: [], code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectUserInfo end");
  }
};

export const selectUserInfoBySalaly = async (userId: string) => {
  console.debug("selectUserInfoBySalaly start");
  try {
    const session = getDriver().session({ database: "neo4j" });

    const sql = `
      match (p: ${CONFIG.DB.NODE.Person} {name : "${userId}"})-[:${CONFIG.DB.Relationships.Person.Salaly}]->(data)
      return data
    `;

    const data = await session
      .run(sql)
      .then((result: any) => {
        return {
          data: result.records[0].get("data").properties,
          code: CONFIG.STATUS_CODE.SUCCESS,
        };
      })
      .catch((error: any) => {
        console.error(error);
        return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
      });
    return data;
  } catch (error) {
    return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectUserInfoBySalaly end");
  }
};

export const selectUserInfoByCommunity = async (userId: string) => {
  console.debug("selectUserInfoByCommunity start");
  try {
    const session = getDriver().session({ database: "neo4j" });

    const sql = `
    match (p: ${CONFIG.DB.NODE.Person} {name : "${userId}"})-[:${CONFIG.DB.Relationships.Person.Community}]->(data)
    return data
    `;
    const data = await session
      .run(sql)
      .then((result: any) => {
        // console.debug(result.records);
        // console.debug(
        //   result.records.map((data) => data.get("data").properties.name),
        // );
        return {
          data: result.records.map((data) => data.get("data").properties.name),
          code: CONFIG.STATUS_CODE.SUCCESS,
        };
      })
      .catch((error: any) => {
        console.error(error);
        return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
      });
    return data;
  } catch (error) {
    return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectUserInfoByCommunity end");
  }
};

export const selectUserInfoByAge = async (userId: strings) => {
  console.debug("selectUserInfoByAge start");
  try {
    const sql = `
    match (p: ${CONFIG.DB.NODE.Person} {name : "${userId}"})-[:${CONFIG.DB.Relationships.Person.Age}]->(data)
    return data
    `;
    const session = getDriver().session({ database: "neo4j" });
    const data = await session
      .run(sql)
      .then((result: any) => {
        return {
          data: result.records[0].get("data").properties,
          code: CONFIG.STATUS_CODE.SUCCESS,
        };
      })
      .catch((error: any) => {
        console.error(error);
        return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
      });
    return data;
  } catch (error) {
    return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("selectUserInfoByAge end");
  }
};
