"use client";

import { useRecoilValue, useRecoilState } from "recoil";
// state
import { ChatFormOpen } from "@/state/chat/ChatFormOpen";
import { ChatTargetUser } from "@/state/chat/ChatTargetUser";
// material
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

export default function Header({} // name, // handleClose,
: {
  // name: string;
  // handleClose: Function;
}) {
  console.log("header");
  const [open, setOpen] = useRecoilState(ChatFormOpen);
  const chatUser = useRecoilValue(ChatTargetUser);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar sx={{ position: "relative" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          {chatUser.userName} さんとチャートする
        </Typography>
        {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
      </Toolbar>
    </AppBar>
  );
}
