import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function FooterGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      // backgroundColor="rgb(255, 246, 246)"
    >
      <Box sx={{ align: "left" }}>{"   "} </Box>
      <Box sx={{ align: "center" }}>
        <Typography>{children}</Typography>
      </Box>
      <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
        <Box>
          <Typography sx={{ verticalAlign: "middle", display: "inline-flex" }}>
            {"  "}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ verticalAlign: "middle", display: "inline-flex" }}>
            {"  "}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
