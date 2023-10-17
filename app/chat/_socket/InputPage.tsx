"use client";

import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
// material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// state
import { LoginSession } from "@/state/user/Login";
// components
import Header from "@/app/chat/_socket/header";

const InputPage = ({
  socketRef,
  setMsg,
}: {
  socketRef: React.MutableRefObject<WebSocket | undefined>;
  setMsg: Function;
}) => {
  const [input, setInput] = useState("");
  const [loginUser, setLoginUser] = useRecoilState(LoginSession);

  const sendData = () => {
    socketRef.current?.send(
      JSON.stringify({ to: loginUser.session[0].userId, msg: input }),
    );
    setMsg((prev: { target: string; data: string }[]) => [
      ...prev,
      { target: `私 - ${loginUser.session[0].userId}`, data: input },
    ]);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "20%",
      }}
    >
      {/* <form autoComplete="off" onSubmit={sendData}> */}
      <TextField
        fullWidth
        label="fullWidth"
        id="fullWidth"
        value={input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInput(event.target.value);
        }}
      />
      <Button variant="outlined" onClick={sendData}>
        Send
      </Button>
      {/* </form> */}
    </Box>
  );
};

export default InputPage;
