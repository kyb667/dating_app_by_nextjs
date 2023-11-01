"use client";

import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
// state
import { ChatTargetUser } from "@/state/chat/ChatTargetUser";
import { LoginSession } from "@/state/user/Login";

// components
import InputPage from "./InputPage";
import ChatList from "./ChatList";

// config
import { CONFIG } from "@/lib/config";

const websocketUrl = process.env.WSS;

interface Chat {
  target: string;
  data: string;
}

type ChatList = Chat[];

const MainBody: NextPage = () => {
  // wss
  const socketRef = useRef<WebSocket>();
  // wss connection
  const [isConnected, setIsConnected] = useState(false);
  // msg リスト
  const [msg, setMsg] = useState<ChatList>([]);
  // 相手のID
  const chatUser = useRecoilValue(ChatTargetUser);

  const [loginUser, setLoginUser] = useRecoilState(LoginSession);

  // 最初のみWSSと連結する
  useEffect(() => {
    let roomName = [chatUser.userId, loginUser.session[0].userId]
      .sort()
      .join("-");

    socketRef.current = new WebSocket(
      `${websocketUrl}/${roomName}/${loginUser.session[0].userId}`,
    );
    socketRef.current.onopen = function () {
      setIsConnected(true);
    };

    socketRef.current.onclose = function () {
      setIsConnected(false);
    };

    // server 側から送られてきたデータを受け取る
    socketRef.current.onmessage = function (event) {
      setMsg((prev: ChatList) => [
        ...prev,
        {
          target: `相手 - ${JSON.parse(event.data).from}`,
          data: JSON.parse(event.data).msg,
        },
      ]);
    };
    return () => {
      if (socketRef.current == null) {
        return;
      }
      socketRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ChatList ChatData={msg} />
      <InputPage socketRef={socketRef} setMsg={setMsg} />
    </>
  );
};

export default MainBody;
