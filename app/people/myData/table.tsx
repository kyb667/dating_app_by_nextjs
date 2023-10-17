"use client";

import React, { Suspense } from "react";
// material
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// config
import { CONFIG } from "@/lib/config";
// db
import { selectUserInfo } from "@/lib/axios";

export default async function AccessibleTable({
  userId,
  caption,
}: {
  userId: string | null;
  caption: string;
}) {
  let data = [];
  if (userId !== null) {
    data = await getData(userId);
  }
  return (
    <Suspense fallback={<div>ssr page loading...</div>}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableCell
              align="center"
              colSpan={3}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {caption}
            </TableCell>
          </TableHead>
          {data.length !== 0 && (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>{CONFIG.DB.NODE.Salaly}</TableCell>
                  <TableCell>{CONFIG.DB.NODE.Community}</TableCell>
                  <TableCell>{CONFIG.DB.NODE.Age}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{data[0].salaly}</TableCell>
                  <TableCell>{data[0].community}</TableCell>
                  <TableCell>{data[0].ageData}</TableCell>
                </TableRow>
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </Suspense>
  );
}

async function getData(userId: string) {
  const res = await selectUserInfo({ userId: userId });
  if (res.code === CONFIG.STATUS_CODE.SUCCESS) {
    return [res.data];
  } else {
    return [];
  }
}
