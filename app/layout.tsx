import type { Metadata } from "next";
import React from "react";
import "./globals.css";

import { Inter, Noto_Sans_Thai, Noto_Sans_Thai_Looped } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });
const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = { title: "TBUN Tools" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} ${notoSansThai.className} ${notoSansThaiLooped.className} !font-default bg-bg text-text_grey text-xs h-full`}
      >
        {children}
      </body>
    </html>
  );
}
