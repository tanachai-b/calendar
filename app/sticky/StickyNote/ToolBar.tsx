import cx from "classnames";

export function ToolBar({ isEditing }: { isEditing?: boolean }) {
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
        isEditing ? "opacity-100" : "opacity-0",
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
