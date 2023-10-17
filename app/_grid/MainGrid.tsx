import { Box } from "@mui/material";

export default function MainGrid({ children }: { children: React.ReactNode }) {
  return <Box sx={{ height: "90%", width: "auto" }}>{children}</Box>;
}
