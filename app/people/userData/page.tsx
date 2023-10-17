"use client";

import React, { Suspense, useEffect, useState, ReactNode, useRef } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import Link from "next/link";
// material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

// icon
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import CloseIcon from "@mui/icons-material/Close";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

// state
import { LoginSession } from "@/state/user/Login";
import { Friend } from "@/state/friend/Friend";
// db
import { SelectUser, selectAllUser, createRelation } from "@/lib/axios";
// config
import { CONFIG } from "@/lib/config";
// breakpoint
import UseBreakpoint from "@/app/_grid/UseBreakpoint";

import AllUser from "./allUser/page";
import RecommendUser from "./recommendUser/page";

// const LoginCheck = () => {
//   const loginUser = useRecoilValue(LoginSession);
//   const [friendList, setFriendList] = useRecoilState(Friend);

//   const getUserData = async () => {
//     console.log(loginUser.session[0].userId);
//     try {
//       const res = await SelectUser({ userId: loginUser.session[0].userId });
//       if (res.code === CONFIG.STATUS_CODE.SUCCESS) {
//         setFriendList(res.data);
//       } else {
//         alert("error");
//       }
//     } catch (error: any) {
//       alert(error);
//     }
//   };

//   const getUserAllData = async () => {
//     try {
//       const res = await selectAllUser();
//       console.log(res);
//       if (res.code === CONFIG.STATUS_CODE.SUCCESS) {
//         setFriendList(res.data);
//       } else {
//         alert("error");
//       }
//     } catch (error: any) {
//       alert(error);
//     }
//   };

//   useEffect(() => {
//     if (loginUser.session.length > CONFIG.COMMON.ZERO) {
//       getUserData();
//     } else {
//       getUserAllData();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [loginUser]);

// };

export default function Page() {
  const breakpoint = UseBreakpoint();
  const cols = {
    xs: 2,
    sm: 4,
    md: 5,
    lg: 6,
    xl: 8,
  }[breakpoint];

  const loginUser = useRecoilValue(LoginSession);

  return (
    <Box sx={{ width: "100%", height: "50%", overflowY: "scroll" }}>
      <ImageList variant="quilted" cols={cols}>
        {/* <LoginCheck /> */}
        <AllUser />
        {/* {loginUser.session.length === 0 ? <AllUser /> : <RecommendUser />} */}
      </ImageList>
    </Box>
  );
}
