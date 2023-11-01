/* ユーザーがログインされているうちにWSと連結し、リアルタイムでアラートをもらえるようにする機能  */

"use client";

import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import Button from "@mui/material/Button";
// state
import { ChatTargetUser } from "@/state/chat/ChatTargetUser";
import { LoginSession } from "@/state/user/Login";
// config
import { CONFIG } from "@/lib/config";

const websocketUrl = process.env.WSS;

const ConnectWSS = () => {
  console.log("LoginSessionWSS");

  const { enqueueSnackbar } = useSnackbar();
  // wss
  const socketRef = useRef<WebSocket>();
  // wss connection
  const [isConnected, setIsConnected] = useState(false);
  const loginUser = useRecoilValue(LoginSession);

  // 最初のみWSSと連結する
  useEffect(() => {
    if (loginUser.session.length > 0) {
      let roomName: string = loginUser.session[0].userId;

      socketRef.current = new WebSocket(
        `${websocketUrl}/${roomName}/${loginUser.session[0].userId}`,
      );

      socketRef.current.onopen = function () {
        console.log("繋がりました!");
        setIsConnected(true);
      };

      socketRef.current.onclose = function () {
        console.log("エラー発生!");
        setIsConnected(false);
      };

      // server 側から送られてきたデータを受け取る
      socketRef.current.onmessage = function (event) {
        console.log(event);
        if (JSON.parse(event.data).msg === "love") {
          enqueueSnackbar(
            `${JSON.parse(event.data).from}さんにいいねされました!`,
          );
        } else {
          enqueueSnackbar(`${JSON.parse(event.data).msg}`);
        }
      };
      return () => {
        if (socketRef.current == null) {
          return;
        }
        socketRef.current.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  return <></>;
};

const Page: NextPage = () => {
  return (
    <SnackbarProvider maxSnack={5}>
      <ConnectWSS />
    </SnackbarProvider>
  );
};

export default Page;
