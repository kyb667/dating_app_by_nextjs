"use client";

import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";

import { useRecoilValue } from "recoil";
import { ChatData } from "@/state/chat/ChatData";

function Header() {
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        // bgcolor: "lightgreen",
      }}
    >
      <div> チャート</div>
    </Box>
  );
}

const Body = ({
  ChatData,
}: {
  ChatData: { target: string; data: string }[];
}) => {
  console.log("Body");

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "90%",
        bgcolor: "background.paper",
        overflow: "auto",
        Height: "400px",
      }}
      dense={true}
    >
      {ChatData.map((item, index) => (
        <ListItem key={`${index}`}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`(${item.target})さん  :  ${item.data}`} />
        </ListItem>
      ))}
    </List>
  );
};

const ChatList = ({
  ChatData,
}: {
  ChatData: { target: string; data: string }[];
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "70%",
        // bgcolor: "gray",
      }}
    >
      <Header />
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          // bgcolor: "lightgreen",
        }}
      >
        <Body ChatData={ChatData} />
      </Box>
    </Box>
  );
};

export default ChatList;
