import { CONFIG } from "@/lib/config";

const DB_URL = CONFIG.DB.URL;

const CHAT_TABLE = CONFIG.DB.CHAT_TABLE;
const USER_TABLE = CONFIG.DB.USER_TABLE;

export async function addChat({
  // roomName,
  to,
  from,
  msg,
}: {
  // roomName: string;
  to: string;
  from: string;
  msg: string;
}) {
  console.debug("addChat start");
  const url = `${DB_URL}/${CHAT_TABLE}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      room: `${to}-${from}`,
      to: to,
      from: from,
      message: msg,
      createAt: "",
    }),
  };
  console.debug(url);
  console.debug(params);
  const res = await fetch(url, params);
  const data = await res.json();
  console.debug(data);
  console.debug("addChat end");
  return data;
}

export async function CreateUser({
  userId,
  password,
  userName,
  hobby,
  salaly,
  height,
  userAge,
}: {
  userId: string;
  password: string;
  userName: string;
  hobby: string[];
  salaly: string;
  height: number;
  userAge: number;
}) {
  console.debug("CreateUSer start");

  const url = `${DB_URL}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "createUser",
      userId: userId,
      userPassword: password,
      userName: userName,
      hobby: hobby,
      salaly: salaly,
      height: height,
      age: userAge,
    }),
  };
  const res = await fetch(url, params);
  const data = await res.json();
  console.debug("CreateUSer end");
  return data;
}

export async function login({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) {
  console.debug("login start");

  const url = `${DB_URL}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "loginUser",
      userId: userId,
      password: password,
    }),
  };
  const res = await fetch(url, params);
  const data = await res.json();
  console.debug("login end");
  return data;
}

export async function SelectUser({ userId }: { userId: string }) {
  console.debug("login start");

  const url = `${DB_URL}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "selectUser",
      userId: userId,
    }),
  };
  const res = await fetch(url, params);
  const data = await res.json();
  console.debug("login end");
  return data;
}

export async function selectAllUser() {
  console.debug("getUserAllData start");

  const url = `${DB_URL}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "selectAllUser",
    }),
  };
  const res = await fetch(url, params);
  const data = await res.json();
  console.debug("getUserAllData end");
  return data;
}

export async function createRelation({ body }: { body: any }) {
  console.debug("createRelation start");

  const url = `${DB_URL}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "createRelation",
      body: body,
    }),
  };
  const res = await fetch(url, params);
  const data = await res.json();
  console.debug("createRelation end");
  return data;
}

export async function selectLoveUser({ userId }: { userId: string }) {
  console.debug("login start");

  const url = `${DB_URL}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "selectLoveUser",
      userId: userId,
    }),
  };
  const res = await fetch(url, params);
  const data = await res.json();
  console.debug("login end");
  return data;
}

export async function selectUserInfo({ userId }: { userId: string }) {
  console.debug("selectUserInfo start");

  const url = `${DB_URL}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "selectUserInfo",
      userId: userId,
    }),
  };
  const res = await fetch(url, params);
  const data = await res.json();
  console.debug("selectUserInfo end");
  return data;
}

export async function populatePerson() {
  console.debug("populatePerson start");

  const url = `${DB_URL}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "populatePerson",
    }),
  };
  const res = await fetch(url, params);
  const data = await res.json();
  console.debug("populatePerson end");
  return data;
}
