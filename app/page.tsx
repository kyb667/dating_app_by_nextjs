import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { CONFIG } from "@/lib/config";
import CircularProgress from "@mui/material/CircularProgress";

// import { makeDummy } from "@/db/dummy";

const header = CONFIG.HEADER;

function List() {
  return header.map((data) => {
    return (
      <div key={data.header}>
        <Box
          sx={{
            p: 1,
            m: 1,
            borderRadius: 2,
            bgcolor: "background.paper",
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          {data.header}
          <ul>
            {data.children.map((target) => {
              return (
                <li key={target.label}>
                  <Link href={target.url}> {target.label} </Link>
                </li>
              );
            })}
          </ul>
        </Box>
      </div>
    );
  });
}

export default function Page() {
  // makeDummy();
  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 3,
        rowGap: 1,
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
      }}
    >
      <List />
    </Box>
  );
}
