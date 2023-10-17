"use client";

import React, { Suspense, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Link from "next/link";
// material
import Box from "@mui/material/Box";
// state
import { ChatFormOpen } from "@/state/chat/ChatFormOpen";
import { ChatTargetUser } from "@/state/chat/ChatTargetUser";
import { ChatData } from "@/state/chat/ChatData";

export default function Page() {
  const [open, setOpen] = useRecoilState(ChatFormOpen);
  const [user, setUser] = useRecoilState(ChatTargetUser);

  return (
    <div>
      <Box
        sx={{
          display: "grid",
          columnGap: 3,
          rowGap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
        }}
      >
        {["A", "B", "C", "D"].map((data, index) => {
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
              {data}さん
              <ul>
                <li>趣味 : 料理</li>
              </ul>
              {/* <button onClick={() => openDialog(data)}>メッセージを送る</button> */}
            </Box>
          );
        })}
      </Box>
    </div>
  );
}
