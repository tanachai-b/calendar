import classNames from "classnames";
import type { Metadata } from "next";
import React from "react";

import "./globals.css";

export const metadata: Metadata = { title: "TBUN Tools" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={classNames(
          "h-full",

          "bg-bg",

          "text-text_grey",
          "text-xs",
          "font-default",
        )}
      >
        {children}
      </body>
    </html>
  );
}
