// import { Suspense } from "react";
// import { getBlogDataById } from "@/lib/dummyjson";
// import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
// import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";

// async function GetData({ id }: { id: number }) {
//   console.log(id);
//   const data = await getBlogDataById({ id });
//   console.log(data);

//   return (
//     <ul>
//       <li> Id : {data.id}</li>
//       <li> userId : {data.userId}</li>
//       <li> title : {data.title}</li>
//       <li> body : {data.body}</li>
//       <li> userId : {data.userId}</li>
//       <li> tags : {data.tags}</li>
//       <li> reactions : {data.reactions}</li>
//     </ul>
//   );
// }

// export default function Page({
//   params, //   searchParams,
// }: {
//   params: { id: number };
//   //   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   const Id = params.id;

//   return (
//     <>
//       <Suspense fallback={<div>ssr page loading...</div>}>
//         <GetData id={Id} />
//         <div>
//           <FavoriteSharpIcon />
//           いいね
//           <FavoriteBorderSharpIcon />
//         </div>
//       </Suspense>
//     </>
//   );
// }
