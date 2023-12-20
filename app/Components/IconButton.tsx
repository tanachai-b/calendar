"use client";
import React, { ReactElement } from "react";

export function IconButton({
  icon,
  text,
  onClick,
}: {
  icon: (props: { size?: number }) => ReactElement;
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex flex-row items-center p-3 gap-1 text-xs text-text_grey hover:text-text active:text-yellow"
      onClick={onClick}
    >
      {icon({})}
      {text}
    </button>
  );
}
