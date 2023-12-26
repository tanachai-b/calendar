import type { Metadata } from "next";
import React from "react";
import "./globals.css";

import { Inter, Noto_Sans_Thai } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

export const metadata: Metadata = { title: "TBUN Tools" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${notoSansThai.className} !font-default bg-bg text-text_grey text-xs`}
      >
        {children}
      </body>
    </html>
  );
}
