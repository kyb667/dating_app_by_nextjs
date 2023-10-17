import { NextRequest } from "next/server";
import { CONFIG } from "@/lib/config";

import { getDriver, select } from "@/lib/db/neo4j";
import { createPerson, createRelation } from "@/lib/db/sql/createPerson";
import { login } from "@/lib/db/sql/login";
import {
  selectPerson,
  selectPersonAll,
  selectLoveUser,
  selectUserInfo,
} from "@/lib/db/sql/selectPerson";

import { findPopulatePerson } from "@/lib/db/sql/populatePerson";

export async function GET(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  // console.log("GET request", searchParams.get("name"));
  return new Response(JSON.stringify({ message: "Hello World" }));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("POST request", body);

  let data: any = { code: CONFIG.STATUS_CODE.ERROR };
  if ("type" in body) {
    switch (body["type"]) {
      case "createUser":
        let code = await createPerson({ body });
        data["code"] = code;
        break;
      case "loginUser":
        data = await login({ body });
        break;
      case "selectUser":
        data = await selectPerson({ body });
        break;
      case "selectAllUser":
        data = await selectPersonAll();
        break;
      case "createRelation":
        data = await createRelation({ body: body.body });
        break;
      case "selectLoveUser":
        data = await selectLoveUser({ body });
        break;
      case "selectUserInfo":
        data = await selectUserInfo(body.userId);
        break;
      case "populatePerson":
        data = await findPopulatePerson();
        break;
    }
  }
  console.log(data);
  return new Response(JSON.stringify(data));
}
