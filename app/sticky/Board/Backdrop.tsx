import cx from "classnames";

export function Backdrop({
  isEditing,
  onMouseDown,
}: {
  isEditing?: boolean;
  onMouseDown?: () => void;
} = {}) {
  return (
    <div
      className={cx({ "pointer-events-none": !isEditing })}
      onMouseDown={onMouseDown}
    >
      <div
        className={cx("absolute", "w-full", "h-full", "transition-all", {
          "backdrop-blur-x10": isEditing,
        })}
      />

      <div
        className={cx(
          "absolute",
          "w-full",
          "h-full",
          "transition-all",
          "bg-black-light",
          isEditing ? "opacity-50" : "opacity-0"
        )}
      />
    </div>
  );
}
