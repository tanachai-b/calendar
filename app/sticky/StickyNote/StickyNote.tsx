import cx from "classnames";
import { ReactNode, useEffect, useRef } from "react";

import { Gradients } from "./Gradients";
import { TextEdit } from "./TextEdit";

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
      className={cx("absolute", "flex", "flex-row", "pointer-events-none")}
      style={{ left: x, top: y }}
    >
      <Paper
        color={color}
        rotate={rotate}
        editing={editing}
        dragging={dragging}
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
      </Paper>
      <ToolBar editing={editing} />
    </div>
  );
}

function Paper({
  color = 0,
  rotate,
  editing,
  dragging,
  onMouseDown,
  onDoubleClick,
  children,
}: {
  color?: number;
  rotate?: number;
  editing?: boolean;
  dragging?: boolean;
  onMouseDown?: () => void;
  onDoubleClick?: () => void;
  children?: ReactNode;
} = {}) {
  return (
    <div
      className={cx(
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
        editing ? "shadow-x50" : dragging ? "shadow-x20" : "shadow-x10",
        "transition-shadow",

        "pointer-events-auto"
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
}

function ToolBar({ editing }: { editing?: boolean }) {
  const bgColors = [
    "bg-yellow-light",
    "bg-orange-light",
    "bg-red-light",
    "bg-purple-light",
    "bg-blue-light",
    "bg-green-bluish-light",
    "bg-green-yellowish-light",
    "bg-white",
  ];

  return (
    <div
      className={cx(
        "ml-x20",
        "flex",
        "flex-col",
        "gap-x5",
        editing ? "opacity-100" : "opacity-0",
        "transition-all"
      )}
    >
      {bgColors.map((bgColor, index) => (
        <div
          key={index}
          className={cx("relative", "size-x30", "group", "pointer-events-auto")}
        >
          <div
            className={cx(
              "relative",
              "size-full",
              "rounded-full",
              "border",
              "border-black-light",
              "bg-white",
              "p-x2",
              "transition-all",
              "group-hover:z-50",
              "group-hover:scale-150"
            )}
          >
            <div className={cx("size-full", "rounded-full", bgColor)}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
