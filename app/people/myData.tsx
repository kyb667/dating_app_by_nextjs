"use client";
import { ReactNode } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
// material
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// state
import { LoginSession } from "@/state/user/Login";
// config
import { CONFIG } from "@/lib/config";
// component
import MyDataTable from "./myData/table";

const UserBox = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Paper variant="elevation">{children}</Paper>
    </Box>
  );
};

const UserData = () => {
  const loginUser = useRecoilValue(LoginSession);

  return loginUser.session.length === CONFIG.COMMON.ZERO ? (
    <UserBox>
      <MyDataTable caption={"おすすめユーザー"} userId={null} />
    </UserBox>
  ) : (
    <UserBox>
      <MyDataTable caption={"My Info"} userId={loginUser.session[0].userId} />
    </UserBox>
  );
};

export default function Page() {
  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 3,
        rowGap: 1,
        gridTemplateColumns: "repeat(1, 1fr)",
        gridTemplateRows: "repeat(1, 1fr)",
      }}
    >
      <UserData />
    </Box>
  );
}
