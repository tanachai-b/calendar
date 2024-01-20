"use client";

import cx from "classnames";
import { RefObject, useEffect, useRef } from "react";

export function StickyNote({
  text,
  color = 0,
  x = 0,
  y = 0,
  rotate = 0,
  dragging,
  editing,
  onMouseDown,
  onDoubleClick,
  onInput,
}: {
  text?: string;
  color?: number;
  x?: number;
  y?: number;
  rotate?: number;
  dragging?: boolean;
  editing?: boolean;
  onMouseDown?: () => void;
  onDoubleClick?: () => void;
  onInput?: (text: string) => void;
} = {}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.setSelectionRange(
      ref.current.value.length,
      ref.current.value.length
    );
  }, []);

  return (
    <div
      className={cx(
        "absolute",
        "w-[250px]",
        "h-[250px]",

        "text-x30",
        "font-light",
        "text-black-light",
        "font-handwriting",
        "select-none",
        "whitespace-pre-wrap",
        "text-center",
        "overflow-hidden",

        "flex",
        "flex-col",
        "items-center",
        "justify-center",

        "rounded-x5",
        editing ? "shadow-x50" : dragging ? "shadow-x20" : "shadow-x10",
        [
          "bg-yellow-light",
          "bg-orange-light",
          "bg-red-light",
          "bg-purple-light",
          "bg-blue-light",
          "bg-green-bluish-light",
          "bg-green-yellowish-light",
          "bg-white",
        ][color],

        "transition-shadow"
      )}
      style={{
        left: x,
        top: y,
        transform: `rotate(${rotate}deg)`,
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <Gradients />
      <TextEdit
        ref={ref}
        text={text}
        editing={editing}
        onInput={onInput}
      ></TextEdit>
    </div>
  );
}

function TextEdit({
  ref,
  text,
  editing,
  onInput,
}: {
  ref?: RefObject<HTMLTextAreaElement>;
  text?: string;
  editing?: boolean;
  onInput?: (text: string) => void;
} = {}) {
  return (
    <div
      className={cx("absolute", "w-full", "flex", "max-w-full", "max-h-full")}
    >
      <div
        className={cx("w-full", "h-fit", "p-x10", "break-words", {
          "opacity-0": editing,
        })}
      >
        {text}
      </div>
      <textarea
        ref={ref}
        className={cx(
          "absolute",
          "size-full",
          "resize-none",
          "outline-none",
          "bg-transparent",
          "overflow-hidden",
          "text-center",
          "p-x10"
        )}
        hidden={!editing}
        value={text}
        onChange={(e) => onInput?.(e.target.value ?? "")}
      />
    </div>
  );
}

function Gradients() {
  return (
    <div className={cx("size-full", "absolute")}>
      <div
        className={cx("size-full", "absolute")}
        style={{
          background: "linear-gradient(155deg, #00000020,#00000000 20%)",
        }}
      ></div>
      <div
        className={cx("size-full", "absolute")}
        style={{
          background: "linear-gradient(-155deg, #00000020,#00000000 20%)",
        }}
      ></div>
      <div
        className={cx("size-full", "absolute")}
        style={{
          background: "linear-gradient(25deg, #ffffff20,#ffffff00 20%)",
        }}
      ></div>
      <div
        className={cx("size-full", "absolute")}
        style={{
          background: "linear-gradient(-25deg, #ffffff20,#ffffff00 20%)",
        }}
      ></div>
    </div>
  );
}
