// "use client";

// import React, { Suspense, useEffect } from "react";
// import { useRecoilValue, useRecoilState } from "recoil";
// import Link from "next/link";
// // material
// import Box from "@mui/material/Box";
// // component
// import Socket from "@/app/chat/_socket/page";
// // state
// import { ChatFormOpen } from "@/state/chat/ChatFormOpen";
// import { ChatTargetUser } from "@/state/chat/ChatTargetUser";
// import { ChatData } from "@/state/chat/ChatData";
// import { Friend } from "@/state/friend/Friend";
// // state
// import { LoginSession } from "@/state/user/Login";

// // db
// import { SelectUser, selectAllUser, createRelation } from "@/lib/axios";
// // config
// import { CONFIG } from "@/lib/config";

// export default function Page() {
//   const [open, setOpen] = useRecoilState(ChatFormOpen);
//   const [user, setUser] = useRecoilState(ChatTargetUser);
//   const [chatData, setChatData] = useRecoilState(ChatData);

//   const [loginUser, setLoginUser] = useRecoilState(LoginSession);
//   const [friendList, setFriendList] = useRecoilState(Friend);

//   const getUserData = async () => {
//     console.log(loginUser.session[0].userId);
//     try {
//       const res = await SelectUser({ userId: loginUser.session[0].userId });
//       if (res.code === CONFIG.STATUS_CODE.SUCCESS) {
//         setFriendList(res.data);
//       } else {
//         alert("error");
//       }
//     } catch (error: any) {
//       alert(error);
//     }
//   };

//   // const getUserAllData = async () => {
//   //   try {
//   //     const res = await selectAllUser();
//   //     console.log(res);
//   //     if (res.code === CONFIG.STATUS_CODE.SUCCESS) {
//   //       setFriendList(res.data);
//   //     } else {
//   //       alert("error");
//   //     }
//   //   } catch (error: any) {
//   //     alert(error);
//   //   }
//   // };

//   useEffect(() => {
//     if (loginUser.session.length > 0) {
//       getUserData();
//     } else {
//       // getUserAllData();
//     }
//   }, []);

//   useEffect(() => {
//     console.log("userId useEffect");
//     if (user !== "" && !(user in chatData)) {
//       setChatData((prev) => ({ ...prev, [user]: [] }));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   const openDialog = (userId: string) => {
//     console.log("openDialog userId", userId);
//     setUser(userId);
//     setOpen(true);
//   };

//   return (
//     <div>
//       <Socket />
//       <Box
//         sx={{
//           display: "grid",
//           columnGap: 3,
//           rowGap: 1,
//           gridTemplateColumns: "repeat(2, 1fr)",
//           gridTemplateRows: "repeat(3, 1fr)",
//         }}
//       >
//         {friendList.length === 0 ? (
//           <div>データがありません</div>
//         ) : (
//           friendList.map((data: any, index) => {
//             return data.love === false ? null : (
//               <Box
//                 sx={{
//                   bgcolor: "#fff",
//                   border: "1px solid",
//                   p: 1,
//                   m: 1,
//                   borderRadius: 2,
//                   fontSize: "0.875rem",
//                   fontWeight: "700",
//                 }}
//                 key={index}
//               >
//                 <div>{data.userName}さん</div>
//                 {/* <ul>
//                 <li>趣味 : 料理</li>
//               </ul> */}
//                 <button onClick={() => openDialog(data.userName)}>
//                   メッセージを送る
//                 </button>
//               </Box>
//             );
//           })
//         )}
//       </Box>
//     </div>
//   );
// }
