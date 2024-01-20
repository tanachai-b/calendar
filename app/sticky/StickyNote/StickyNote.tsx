import cx from "classnames";
import { useEffect, useRef } from "react";

import { Paper } from "./Paper";
import { Shadings } from "./Shadings";
import { TextEdit } from "./TextEdit";
import { ToolBar } from "./ToolBar";

export function StickyNote({
  text,
  color = 0,
  x = 0,
  y = 0,
  rotate = 0,
  isDragging,
  isEditing,
  onMouseDown,
  onDoubleClick,
  onInput,
}: {
  text?: string;
  color?: number;
  x?: number;
  y?: number;
  rotate?: number;
  isDragging?: boolean;
  isEditing?: boolean;
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
        isDragging={isDragging}
        isEditing={isEditing}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      >
        <Shadings />
        <TextEdit
          ref={ref}
          text={text}
          isEditing={isEditing}
          onInput={onInput}
        ></TextEdit>
      </Paper>
      <ToolBar isEditing={isEditing} />
    </div>
  );
}
