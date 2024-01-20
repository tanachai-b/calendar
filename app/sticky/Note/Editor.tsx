import cx from "classnames";

import { Icon } from "../../components";

export function Editor({
  visible,
  selectedColor,
  onPreviewColor,
  onSelectColor,
  onDelete,
}: {
  visible?: boolean;
  selectedColor?: number;
  onPreviewColor?: (colorIndex?: number) => void;
  onSelectColor?: (colorIndex: number) => void;
  onDelete?: () => void;
} = {}) {
  return (
    <div
      className={cx(
        "relative",
        "-top-x10",
        "ml-x20",
        "flex",
        "flex-col",
        visible ? "opacity-100" : "opacity-0",
        "transition-all",
        { "pointer-events-auto": visible }
      )}
    >
      <ColorSelector
        selectedColor={selectedColor}
        onPreviewColor={onPreviewColor}
        onSelectColor={onSelectColor}
      />

      <div className={cx("h-x10")} />

      <div
        className={cx(
          "relative",
          "flex",
          "flex-row",
          "items-center",
          "gap-x10"
        )}
        onClick={onDelete}
      >
        <div className={cx("p-x2", "group", "peer")}>
          <div
            className={cx(
              "size-x30",
              "rounded-full",
              "border",
              "border-white",
              "bg-black-light",
              "transition-all",
              "group-hover:scale-150",
              "flex",
              "items-center",
              "justify-center"
            )}
          >
            <Icon
              icon="close"
              className={cx("text-white", "text-[25px]", {})}
            />
          </div>
        </div>

        <div
          className={cx(
            "absolute",
            "left-[40px]",
            "peer-hover:left-[45px]",
            "transition-all",
            "text-white",
            "text-x15"
          )}
        >
          Delete
        </div>
      </div>
    </div>
  );
}

function ColorSelector({
  selectedColor,
  onPreviewColor,
  onSelectColor,
}: {
  selectedColor?: number;
  onPreviewColor?: (colorIndex?: number) => void;
  onSelectColor?: (colorIndex: number) => void;
}) {
  const colors = [
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
      className={cx("flex", "flex-col")}
      onMouseLeave={() => onPreviewColor?.()}
    >
      {colors.map((color, index) => (
        <Color
          key={index}
          color={color}
          isSelected={selectedColor === index}
          onMouseOver={() => onPreviewColor?.(index)}
          onClick={() => onSelectColor?.(index)}
        />
      ))}
    </div>
  );
}

function Color({
  color,
  isSelected,
  onMouseOver,
  onClick,
}: {
  color?: string;
  isSelected?: boolean;
  onMouseOver?: () => void;
  onClick?: () => void;
} = {}) {
  return (
    <div
      className={cx("p-x2", "group")}
      onMouseOver={onMouseOver}
      onClick={onClick}
    >
      <div
        className={cx(
          "size-x30",
          "rounded-full",
          "border",
          "border-black-light",
          "bg-white",
          "p-x2",
          "transition-all",
          "group-hover:scale-150"
        )}
      >
        <div className={cx("size-full", "rounded-full", color)}>
          <Icon
            icon="check"
            className={cx("text-black-light", "text-[25px]", {
              invisible: !isSelected,
            })}
          />
        </div>
      </div>
    </div>
  );
}
