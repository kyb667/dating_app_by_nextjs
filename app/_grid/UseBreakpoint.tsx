import { useMediaQuery, useTheme } from "@mui/material";

const UseBreakpoint = () => {
  const theme = useTheme();
  const matchingBreakpoint = [
    useMediaQuery(theme.breakpoints.only("xs")) === true ? "xs" : "",
    useMediaQuery(theme.breakpoints.only("sm")) === true ? "sm" : "",
    useMediaQuery(theme.breakpoints.only("md")) === true ? "md" : "",
    useMediaQuery(theme.breakpoints.only("lg")) === true ? "lg" : "",
    useMediaQuery(theme.breakpoints.only("xl")) === true ? "xl" : "",
  ].filter((key) => key !== "");

  // console.log("matchingBreakpoint : ", matchingBreakpoint);

  return matchingBreakpoint[0];
};

export default UseBreakpoint;
