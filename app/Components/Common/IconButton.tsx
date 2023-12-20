import React, { ReactElement } from "react";

export function IconButton({
  icon,
  text,
  active,
  onClick,
}: {
  icon: ReactElement;
  text: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`flex flex-row items-center p-2 gap-1 text-xs text-text_grey hover:text-text active:text-yellow ${
        active ? "text-yellow font-bold" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
