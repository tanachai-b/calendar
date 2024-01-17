import type { Metadata } from "next";
import React from "react";
import "./globals.css";

import { Inter, Noto_Sans_Thai, Playpen_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });
const playpenSans = Playpen_Sans({ subsets: ["latin"] });

export const metadata: Metadata = { title: "TBUN Tools" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${playpenSans.className} !font-default bg-bg text-text_grey text-xs h-full`}
      >
        {children}
      </body>
    </html>
  );
}
