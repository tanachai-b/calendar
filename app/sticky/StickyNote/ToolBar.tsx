import cx from "classnames";

import { Icon } from "../../components";

export function ToolBar({
  visible,
  color,
  onPreviewColor,
  onSelectColor,
}: {
  visible?: boolean;
  color?: number;
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
        visible ? "opacity-100" : "opacity-0",
        "transition-all",
        { "pointer-events-auto": visible }
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
            <div className={cx("size-full", "rounded-full", bgColor)}>
              <Icon
                icon="check"
                className={cx("text-black-light", "text-[25px]", {
                  invisible: color !== index,
                })}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
