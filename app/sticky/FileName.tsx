"use client";
import cx from "classnames";

export function FileName({
  className,
  fileName,
  isSaving,
}: {
  className?: string;
  fileName?: string;
  isSaving?: boolean;
} = {}) {
  return (
    <div
      className={cx(
        "pointer-events-none",
        "p-x30",
        "flex",
        "items-start",
        "justify-center",
        className
      )}
    >
      <div
        className={cx(
          "rounded-full",

          "border",
          "border-white-dark",
          "border-opacity-25",

          "bg-black-light",
          "bg-opacity-75",

          "text-white-dark",
          "text-opacity-50",

          "backdrop-blur-x2",

          "px-x10",
          "py-x5",

          "flex",
          "flex-row"
        )}
      >
        {fileName ?? "Unsaved"}
        {fileName ? (
          <>
            <StatusText isVisible={isSaving} text="saving..." />
            <StatusText isVisible={!isSaving} text="saved" />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function StatusText({
  isVisible,
  text,
}: {
  isVisible?: boolean;
  text?: string;
} = {}) {
  return (
    <div
      className={cx(
        isVisible ? "px-x10" : "",
        isVisible ? "max-w-[60px]" : "max-w-x0",
        "transition-all",

        "flex",
        "flex-row",
        "overflow-hidden",

        "italic",
        "text-white-dark",
        "text-opacity-100"
      )}
    >
      {text}
    </div>
  );
}
