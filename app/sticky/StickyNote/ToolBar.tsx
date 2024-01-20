import cx from "classnames";

export function ToolBar({
  isEditing,
  onPreviewColor,
  onSelectColor,
}: {
  isEditing?: boolean;
  onPreviewColor?: (colorIndex?: number) => void;
  onSelectColor?: (colorIndex: number) => void;
}) {
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
        isEditing ? "opacity-100" : "opacity-0",
        "transition-all",
        { "pointer-events-auto": isEditing }
      )}
      onMouseLeave={() => onPreviewColor?.()}
    >
      {bgColors.map((bgColor, index) => (
        <div
          key={index}
          className={cx("relative", "p-x2", "group")}
          onMouseOver={() => onPreviewColor?.(index)}
          onClick={() => onSelectColor?.(index)}
        >
          <div
            className={cx(
              "relative",
              "size-full",
              "rounded-full",
              "size-x30",
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
