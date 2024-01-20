import cx from "classnames";
import { useState } from "react";

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
  onTextChange,
  onColorChange,
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
  onTextChange?: (text: string) => void;
  onColorChange?: (color: number) => void;
} = {}) {
  const [previewColor, setPreviewColor] = useState<number>();

  return (
    <div
      className={cx("absolute", "flex", "flex-row", "pointer-events-none")}
      style={{ left: x, top: y }}
    >
      <Paper
        color={previewColor ?? color}
        rotate={rotate}
        isDragging={isDragging}
        isEditing={isEditing}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      >
        <Shadings />
        <TextEdit
          text={text}
          isEditing={isEditing}
          onChange={onTextChange}
        ></TextEdit>
      </Paper>
      <ToolBar
        visible={isEditing}
        color={color}
        onPreviewColor={(color) => setPreviewColor(color)}
        onSelectColor={(color) => onColorChange?.(color)}
      />
    </div>
  );
}
