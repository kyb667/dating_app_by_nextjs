import { Suspense } from "react";
import Box from "@mui/material/Box";
import MyData from "./myData";
import Popular from "./Popular";
import UserData from "./userData";
import RecommendData from "./recommendData";
import CircularProgress from "@mui/material/CircularProgress";

export default function Page() {
  return (
    <>
      <Suspense fallback={<CircularProgress disableShrink />}>
        <MyData />
        <UserData />
        <Popular />
        <RecommendData />
      </Suspense>
    </>
  );
}
