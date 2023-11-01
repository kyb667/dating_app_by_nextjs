import { getDriver } from "@/lib/db/neo4j";
import { CONFIG } from "@/lib/config";

export const findPopulatePerson = async () => {
  console.debug("findPopulatePerson start");
  try {
    const sql = `
        call {
            match (p:${CONFIG.DB.NODE.Person})<- [:followLove] - (newPerson)
            return p.userId as userId, p.userName as userName, count(*) as cnt order by cnt desc limit 3
        }
        call {
            with userId
            match (p:${CONFIG.DB.NODE.Person} {userId :userId})-[:${CONFIG.DB.Relationships.Person.Age}] - (age)
            return age.name as age
        }
        call {
            with userId
            match (p:${CONFIG.DB.NODE.Person} {userId :userId})-[:${CONFIG.DB.Relationships.Person.Salaly}] - (salaly)
            return salaly.name as salaly
        }
        return userId, userName, age, salaly, COLLECT {
            with userId
            MATCH (p:${CONFIG.DB.NODE.Person} {userId :userId})-[:${CONFIG.DB.Relationships.Person.Community}]-(com)
            RETURN com.name as community
        } as community
    `;
    const findData = await getDriver()
      .session({ database: "neo4j" })
      .run(sql)
      .then((result: any) => {
        let data = [];

        for (const iter of result.records) {
          let d: any = { ...{} };
          for (const key of iter.keys) {
            d[key] = iter.get(key);
          }
          data.push(d);
        }
        return data;
      })
      .catch((error: any) => {
        console.error(error);
        return [];
      });
    // console.debug("findData : ", findData);
    return {
      data: findData,
      code: CONFIG.STATUS_CODE.SUCCESS,
    };
  } catch (error) {
    return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
  } finally {
    console.debug("findPopulatePerson end");
  }
};
