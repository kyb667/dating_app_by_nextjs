import { getDriver } from "@/lib/db/neo4j";
import { CONFIG } from "@/lib/config";

export const login = async ({ body }: { body: any }) => {
  console.log("login start");
  try {
    const session = getDriver().session({ database: "neo4j" });
    const data = await session
      .run(
        `
      MATCH (p:Person)
      WHERE p.name = $userId and p.password = $password
      RETURN p
      `,
        body,
      )
      .then((result: any) => {
        if (result.records.length > CONFIG.COMMON.ZERO) {
          console.log(result.records[0]);
          console.log(result.records[0].get(0));
          console.log(result.records[0].get(0).properties.name);
          return {
            data: result.records[0].get(0).properties,
            code: CONFIG.STATUS_CODE.SUCCESS,
          };
        } else {
          return { data: [], code: CONFIG.STATUS_CODE.ERROR };
        }
      })
      .catch((error: any) => {
        console.error(error);
        return { data: [], code: CONFIG.STATUS_CODE.ERROR };
      });
    return data;
  } catch (error) {
    return { data: [], code: CONFIG.STATUS_CODE.ERROR };
  }
};
