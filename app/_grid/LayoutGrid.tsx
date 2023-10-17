import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Box sx={{ bgcolor: "#FFDFDF", height: "100%" }}>{children}</Box>
    </React.Fragment>
  );
}
