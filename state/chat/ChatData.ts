import { atom } from "recoil";

export interface data {
  target: string;
  data: string;
  createAt: string;
  fileName: string;
}

export interface userData {
  [userId: string]: data[];
}

export type chatData = userData;

export const ChatData = atom<chatData>({
  key: "ChatData",
  default: {},
});
