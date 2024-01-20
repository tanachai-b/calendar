import cx from "classnames";
import { RefObject } from "react";

export function TextEdit({
  ref,
  text,
  isEditing,
  onChange,
}: {
  ref?: RefObject<HTMLTextAreaElement>;
  text?: string;
  isEditing?: boolean;
  onChange?: (text: string) => void;
} = {}) {
  return (
    <div
      className={cx("absolute", "w-full", "max-w-full", "max-h-full", "flex")}
    >
      <div
        className={cx("w-full", "h-fit", "p-x10", "break-words", {
          "opacity-0": isEditing,
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
        hidden={!isEditing}
        value={text}
        onChange={(e) => onChange?.(e.target.value ?? "")}
      />
    </div>
  );
}
