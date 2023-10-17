"use client";

import React, { Suspense, useEffect, ReactNode } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Link from "next/link";
// material
import Box from "@mui/material/Box";
// component
import Socket from "@/app/chat/_socket/page";
// state
import { ChatFormOpen } from "@/state/chat/ChatFormOpen";
import { ChatTargetUser } from "@/state/chat/ChatTargetUser";
import { ChatData } from "@/state/chat/ChatData";
import { LoveFriend } from "@/state/friend/LoveFriend";
// state
import { LoginSession } from "@/state/user/Login";

// db
import { selectLoveUser } from "@/lib/axios";
// config
import { CONFIG } from "@/lib/config";

const NoDataComponents = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 3,
        rowGap: 1,
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          border: "1px solid",
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default function Page() {
  const [open, setOpen] = useRecoilState(ChatFormOpen);
  const [user, setUser] = useRecoilState(ChatTargetUser);
  // const [chatData, setChatData] = useRecoilState(ChatData);

  const [loginUser, setLoginUser] = useRecoilState(LoginSession);
  const [friendList, setFriendList] = useRecoilState(LoveFriend);

  const getUserData = async () => {
    try {
      const res = await selectLoveUser({ userId: loginUser.session[0].userId });
      if (res.code === CONFIG.STATUS_CODE.SUCCESS) {
        setFriendList(res.data);
      } else {
        alert("error");
      }
    } catch (error: any) {
      alert(error);
    }
  };

  useEffect(() => {
    if (loginUser.session.length > 0) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDialog = (userId: string, userName: string) => {
    setUser({ userId: userId, userName: userName });
    setOpen(true);
  };

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Socket />
      {loginUser.session.length === 0 ? (
        <NoDataComponents>ログインしてください</NoDataComponents>
      ) : friendList.length === 0 ? (
        <NoDataComponents>気に入った人がいません</NoDataComponents>
      ) : (
        <Suspense fallback={<p>Loading feed...</p>}>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
            }}
          >
            {friendList.map((data: any, index) => {
              return (
                <Box
                  sx={{
                    bgcolor: "#fff",
                    border: "1px solid",
                    p: 1,
                    m: 1,
                    borderRadius: 2,
                    fontSize: "0.875rem",
                    fontWeight: "700",
                  }}
                  key={index}
                >
                  <p>{data.userName}さん</p>
                  <button
                    onClick={() => openDialog(data.userId, data.userName)}
                  >
                    メッセージを送る
                  </button>
                </Box>
              );
            })}
          </Box>
        </Suspense>
      )}
    </Suspense>
  );
}
