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
//
import Progress from "@/app/_progress/Progress";

const websocketUrl = process.env.NEXT_PUBLIC_WSS;

const FriendDataComponentsHeader = ({
  data,
  index,
}: {
  data: any;
  index: number;
}) => {
  const user = useRecoilValue(LoginSession);
  // wss
  const socketRef = useRef<WebSocket>();
  // wss connection
  const [isConnected, setIsConnected] = useState(false);

  const [friendList, setFriendList] = useRecoilState(Friend);

  const clickLoveBtn = async ({ friendId }: { friendId: string }) => {
    let body = {
      from: CONFIG.DB.NODE.Person,
      to: CONFIG.DB.NODE.Person,
      toName: user.session[0].userId,
      fromName: friendId,
      relationName: CONFIG.DB.Relationships.Person.Person.love,
    };

    socketRef.current = new WebSocket(
      `${websocketUrl}/${friendId}/${user.session[0].userId}`,
    );
    const res = await createRelation({ body: body });
    if (res === CONFIG.STATUS_CODE.SUCCESS) {
      let data: any = [...friendList];
      data[index] = { ...data[index], love: true };
      setFriendList(data);
      socketRef.current.onopen = function () {
        socketRef.current?.send(
          JSON.stringify({ to: user.session[0].userId, msg: "love" }),
        );
        socketRef.current?.close();
      };
    }
  };

  return (
    <>
      <ImageListItemBar
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        }}
        position="top"
        actionIcon={
          <IconButton
            sx={{ color: "white" }}
            aria-label={`star ${data.userName}`}
          >
            <CloseIcon
              sx={{ disabled: `${user.session.length === 0 ? true : false}` }}
            />
          </IconButton>
        }
        actionPosition="left"
      />
      <ImageListItemBar
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        }}
        position="top"
        actionIcon={
          <>
            {user.session.length === 0 ? (
              <IconButton
                sx={{
                  color: "gray",
                }}
                aria-label={`star ${data.userName}`}
              >
                <FavoriteBorderSharpIcon sx={{ disabled: "false" }} />
              </IconButton>
            ) : data.love ? (
              <IconButton
                sx={{
                  color: "red",
                }}
                aria-label={`star ${data.userName}`}
              >
                <FavoriteSharpIcon />
              </IconButton>
            ) : (
              <IconButton
                sx={{
                  color: "red",
                }}
                aria-label={`star ${data.userName}`}
                onClick={() => clickLoveBtn({ friendId: data.userId })}
              >
                <FavoriteBorderSharpIcon />
              </IconButton>
            )}
          </>
        }
        actionPosition="right"
      />
    </>
  );
};

const FriendDataComponentsBody = ({
  label,
  data,
}: {
  label: string;
  data: any;
}) => {
  return <React.Fragment>{`${label} —  ${data}`}</React.Fragment>;
};

const FriendData = ({ data, index }: { data: any; index: number }) => {
  let i: number = index % CONFIG.IMG.length;
  const url: string = CONFIG.IMG[i].img;

  return (
    <ImageListItem key={index}>
      <picture>
        <img
          srcSet={`${url}?w=248&h=248&fit=crop&auto=format&dpr=2 2x`}
          src={`${url}?w=248&h=248&fit=crop&auto=format`}
          alt={`${data.userName} さん`}
          loading="lazy"
        />
      </picture>
      <FriendDataComponentsHeader data={data} index={index} />
      <ImageListItemBar
        title={`${data.userName} さん`}
        position="below"
        sx={{ width: "248px" }}
        subtitle={
          <>
            <FriendDataComponentsBody label={"年齢"} data={data.age} />
            <br />
            <FriendDataComponentsBody label={"年収"} data={data.salaly} />
            <br />
            <FriendDataComponentsBody label={"趣味"} data={data.community} />
          </>
        }
      />
    </ImageListItem>
  );
};

const LoginCheck = () => {
  const loginUser = useRecoilValue(LoginSession);
  const [friendList, setFriendList] = useRecoilState(Friend);

  const getUserData = async () => {
    console.log(loginUser.session[0].userId);
    try {
      const res = await SelectUser({ userId: loginUser.session[0].userId });
      if (res.code === CONFIG.STATUS_CODE.SUCCESS) {
        setFriendList(res.data);
      } else {
        alert("error");
      }
    } catch (error: any) {
      alert(error);
    }
  };

  const getUserAllData = async () => {
    try {
      const res = await selectAllUser();
      console.log(res);
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
    if (loginUser.session.length > CONFIG.COMMON.ZERO) {
      getUserData();
    } else {
      getUserAllData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  return friendList.length === 0 ? (
    <Progress>データ読み込み中...</Progress>
  ) : (
    friendList.map((data: any, index: number) => (
      <div key={index}>
        <FriendData data={data} index={index} />
      </div>
    ))
  );
};

export default function Page() {
  const breakpoint = UseBreakpoint();
  const cols = {
    xs: 2,
    sm: 4,
    md: 5,
    lg: 6,
    xl: 8,
  }[breakpoint];

  return (
    <Box sx={{ width: "100%", height: "50%", overflowY: "scroll" }}>
      <ImageList variant="quilted" cols={cols}>
        <LoginCheck />
      </ImageList>
    </Box>
  );
}
