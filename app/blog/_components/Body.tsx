// "use client";
// // csr方式のレンダリング

// import { useState, useEffect, Suspense } from "react";

// import { useRecoilValue, useRecoilState } from "recoil";
// // lib
// import { getBlogData } from "@/lib/dummyjson";
// // state
// import { BlogList } from "@/state/blog/BlogList";

// // components
// import Progress from "@/app/_progress/Progress";
// // material
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import CommentIcon from "@mui/icons-material/Comment";
// import IconButton from "@mui/material/IconButton";
// import Pagination from "@mui/material/Pagination";

// import Link from "next/link";

// const skip = 0;

// function MakeColumn() {
//   const [blogData, setBlogData] = useRecoilState(BlogList);
//   const [limit, setLimit] = useState(5);

//   const fetchData = async () => {
//     const data = await getBlogData({ skip, limit });
//     setBlogData(data["posts"]);
//   };

//   useEffect(() => {
//     fetchData();
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return blogData.length === 0 ? (
//     <Progress>blog list Loading ...</Progress>
//   ) : (
//     blogData.map((d: any, index: number) => {
//       return (
//         <ListItem
//           key={index}
//           disableGutters
//           secondaryAction={
//             <>
//               <IconButton aria-label="comment">
//                 <CommentIcon />
//               </IconButton>
//             </>
//           }
//         >
//           <Link href={`/blog/${d.id}`}>
//             <ListItemText primary={`Line item ${d.title}`} />
//           </Link>
//         </ListItem>
//       );
//     })
//   );
// }

// export default function Body() {
//   return <MakeColumn />;
// }
