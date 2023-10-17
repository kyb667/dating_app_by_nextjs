import { atom } from "recoil";

export const ChatTargetUser = atom({
  key: "ChatTargetUser",
  default: { userId: "", userName: "" },
});
