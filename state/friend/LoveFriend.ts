import { atom } from "recoil";

// export type Data = {
//   userId: string;
//   userPassword: string;
//   userName: string;
//   // hobby: string[];
//   // age: number;
//   // height: number;
//   // salaly: string;
// };

// export type LoginSessionData = {
//   session: Data[];
// };

export const LoveFriend = atom({
  key: "LoveFriend",
  default: [],
});
