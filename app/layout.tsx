"use client";

import { RecoilRoot } from "recoil";
import HeaderGrid from "@/app/_grid/HeaderGrid";
import LayoutGrid from "@/app/_grid/LayoutGrid";
import MainGrid from "@/app/_grid/MainGrid";
import FooterGrid from "@/app/_grid/FooterGrid";
import Head from "next/head";
import LoginSessionWSS from "@/app/_wss/_session/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>my app</title>
      </Head>
      <body>
        <RecoilRoot>
          <LayoutGrid>
            <HeaderGrid>
              <LoginSessionWSS />
            </HeaderGrid>
            <MainGrid>{children}</MainGrid>
            <FooterGrid>© Eunbi Kwon</FooterGrid>
          </LayoutGrid>
        </RecoilRoot>
      </body>
    </html>
  );
}
