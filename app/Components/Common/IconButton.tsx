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
      className={`flex flex-row items-center p-2.5 gap-1 text-xs leading-none hover:text-text_white active:text-highlight_yellow ${
        active ? "text-highlight_yellow font-bold" : "text-text_grey"
      }`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
