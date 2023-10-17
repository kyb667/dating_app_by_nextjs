// import { getDriver } from "@/db/neo4j";
// import { CONFIG } from "@/lib/config";

// export const createRelation = async ({ body }: { body: any }) => {
//   console.log("createRelation start");
//   try {
//     const salalyData = await selectPersonBySalaly({ body: body });
//     const communityData = await selectPersonByCommunity({ body: body });
//     const ageData = await selectPersonByAge({ body: body });

//     let personList = {};
//     if (
//       Math.max([salalyData.code, communityData.code, ageData.code]) ===
//       CONFIG.STATUS_CODE.ERROR
//     ) {
//       return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
//     } else {
//       for (const data of [salalyData.data, communityData.data, ageData.data]) {
//         personList = Object.assign({}, personList, data);
//       }
//     }
//     return {
//       data: Object.values(personList),
//       code: CONFIG.STATUS_CODE.SUCCESS,
//     };
//   } catch (error) {
//     return { data: {}, code: CONFIG.STATUS_CODE.ERROR };
//   } finally {
//     console.log("createRelation end");
//   }
// };
