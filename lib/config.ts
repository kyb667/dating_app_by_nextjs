export const CONFIG = {
  HEADER: [
    // { header: "談話室", children: [{ url: "/test", label: "なんでもOK!" }] },
    {
      header: "マッチング",
      children: [{ url: "/people", label: "人を探す" }],
    },
    // {
    //   header: "コミュニティ",
    //   children: [
    //     { url: "/community", label: "コミュニティで探す" },
    //     { url: "/myCommunity", label: "私のコミュニティ" },
    //   ],
    // },
    {
      header: "チャット",
      children: [{ url: "/chat", label: "チャットする" }],
    },
  ],
  // HOBBY: ["cooking", "dancing", "cycling", "jogging", "drawing"],
  HOBBY: [
    { label: "読書", value: "" },
    { label: "映画鑑賞", value: "" },
    { label: "英会話（外国語を習う）", value: "" },
    { label: "カメラで写真を撮る", value: "" },
    { label: "ジョギング", value: "" },
    { label: "ネットサーフィン", value: "" },
    { label: "音楽を聴く（演奏する）", value: "" },
    { label: "ペットを飼う", value: "" },
    { label: "ヨガ", value: "" },
    { label: "スポーツ観戦", value: "" },
    { label: "テレビゲーム・ゲームアプリ", value: "" },
    { label: "カメラで写真を撮る", value: "" },
    { label: "アロマテラピー", value: "" },
    { label: "料理", value: "" },
    { label: "DIY", value: "" },
    { label: "温泉巡り", value: "" },
  ],
  SALALY: [
    { label: "～ 500", value: "" },
    { label: "500 ～ 600", value: "" },
    { label: "600 ～ 700", value: "" },
    { label: "700 ～ 800", value: "" },
    { label: "800 ～ 900", value: "" },
    { label: "900 ～ 1000", value: "" },
    { label: "1000 ～", value: "" },
  ],
  URL: {
    MAIN: "/",
    LOGIN: "/login",
    SIGNIN: "/signin",
  },
  DB: {
    // URL: "https://5twlys-3001.csb.app",
    URL: "/api/post",
    CHAT_TABLE: "",
    USER_TABLE: "",
    NODE: {
      Salaly: "Salaly",
      Person: "Person",
      Community: "Community",
      Age: "Age",
    },
    Relationships: {
      Person: {
        Salaly: "followSalaly",
        Community: "followCommunity",
        Age: "followAge",
        Person: {
          love: "followLove",
        },
      },
    },
  },
  STATUS_CODE: {
    SUCCESS: 200,
    ERROR: 500,
  },
  COMMON: {
    ZERO: 0,
    ONE: 1,
  },
  IMG: [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    },
    {
      img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    },
    {
      img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    },
    {
      img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    },
    {
      img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    },
    {
      img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    },
    {
      img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    },
    {
      img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    },
    {
      img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    },
    {
      img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    },
    {
      img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    },
    {
      img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    },
    {
      img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    },
  ],
};
