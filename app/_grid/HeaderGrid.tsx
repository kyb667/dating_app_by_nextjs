"use client";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { LoginSession } from "@/state/user/Login";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { CONFIG } from "@/lib/config";

const RightHeader = () => {
  const router = useRouter();
  const [UserSession, setUserSession] = useRecoilState(LoginSession);

  const logout = () => {
    setUserSession({ session: [] });
    router.push(CONFIG.URL.MAIN);
  };

  return UserSession.session.length === 0 ? (
    <Box>
      <Typography sx={{ verticalAlign: "middle", display: "inline-flex" }}>
        <Button>
          <Link href={CONFIG.URL.LOGIN}>ログイン</Link>
        </Button>
        <Button>
          <Link href={CONFIG.URL.SIGNIN}>会員登録</Link>
        </Button>
      </Typography>
    </Box>
  ) : (
    <>
      <Box>
        <Typography sx={{ verticalAlign: "middle", display: "inline-flex" }}>
          <Button>{UserSession.session[0].userName} 様</Button>
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ verticalAlign: "middle", display: "inline-flex" }}>
          <Button onClick={logout}>ログアウト</Button>
        </Typography>
      </Box>
    </>
  );
};

export default function HeaderGrid({
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
      <Box sx={{ align: "left" }}>
        <Typography>
          <Button>
            <Link href={CONFIG.URL.MAIN}>Home</Link>
          </Button>
        </Typography>
      </Box>
      <Box sx={{ align: "center" }}>
        <Typography>{children}</Typography>
      </Box>
      <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
        <RightHeader />
      </Stack>
    </Stack>
  );
}
