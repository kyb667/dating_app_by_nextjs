import { getDriver } from "@/lib/db/neo4j";
import { CONFIG } from "@/lib/config";

export const makeDummy = () => {
  console.log("makeDummy");

  const findData = getDriver()
    .session({ database: "neo4j" })
    .run(
      `
    MATCH (n) DETACH DELETE n
      `,
    );

  let salalyList = [];
  for (const salaly of CONFIG.SALALY) {
    salalyList.push({ name: salaly.label });
  }
  const salaly = { props: salalyList };

  const _ = getDriver()
    .session({ database: "neo4j" })
    .run(
      `
    UNWIND $props AS properties
    CREATE (n:Salaly)
    SET n = properties
    RETURN n
    `,
      salaly,
    )
    .then((res: any) => console.log(res))
    .catch((error: any) => console.log(error));

  let hobbyList = [];
  for (const salaly of CONFIG.HOBBY) {
    hobbyList.push({ name: salaly.label });
  }

  const hobby = { props: hobbyList };

  const _1 = getDriver()
    .session({ database: "neo4j" })
    .run(
      `
    UNWIND $props AS properties
    CREATE (n:Community)
    SET n = properties
    RETURN n
    `,
      hobby,
    )
    .then((res: any) => console.log(res))
    .catch((error: any) => console.log(error));

  let ageList = [];
  for (let index = 1; index < 11; index++) {
    ageList.push({ name: `${index * 10}代` });
  }

  const age = { props: ageList };

  const _2 = getDriver()
    .session({ database: "neo4j" })
    .run(
      `
    UNWIND $props AS properties
    CREATE (n:Age)
    SET n = properties
    RETURN n
    `,
      age,
    )
    .then((res: any) => console.log(res))
    .catch((error: any) => console.log(error));

  console.log(salaly);
  console.log(hobby);
  console.log(age);
};
