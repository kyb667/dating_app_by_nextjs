// "use client";

// import { useRecoilValue, useRecoilState } from "recoil";
// // state
// import { PageNumber } from "@/state/blog/PageNumber";
// import { BlogList } from "@/state/blog/BlogList";
// // material
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// // components
// import Progress from "@/app/_progress/Progress";

// export default function PaginationComponent() {
//   const blogData = useRecoilValue(BlogList);
//   console.log(blogData);

//   return (
//     <div>
//       {blogData.length === 0 ? (
//         <Progress>pagination Loading ...</Progress>
//       ) : (
//         <Pagination count={blogData.length} showFirstButton showLastButton />
//       )}
//     </div>
//   );
// }
