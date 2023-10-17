// "use client";

import React, { Suspense } from "react";
// import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
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

import { UserList } from "../components/userList";

export default async function Page() {
  console.log("allUser");
  const breakpoint = UseBreakpoint();
  const cols = {
    xs: 2,
    sm: 4,
    md: 5,
    lg: 6,
    xl: 8,
  }[breakpoint];

  const friendList = await getData();

  return <UserList friendList={friendList} />;
}

async function getData() {
  const data = await selectAllUser();
  return data.data;
}
