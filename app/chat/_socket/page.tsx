"use client";

import type { NextPage } from "next";
import { forwardRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

// material
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
// material
import Box from "@mui/material/Box";

// state
import { ChatFormOpen } from "@/state/chat/ChatFormOpen";

// components
import Header from "./header";
import MainBody from "./MainBody";

// breakpoint
import UseBreakpoint from "@/app/_grid/UseBreakpoint";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Page: NextPage = () => {
  const [open, setOpen] = useRecoilState(ChatFormOpen);

  const handleClose = () => {
    setOpen(false);
  };
  const breakpoint = UseBreakpoint();

  return (
    <Dialog
      fullScreen
      // maxWidth="xs"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Header />
      <MainBody />
    </Dialog>
  );
};

export default Page;
