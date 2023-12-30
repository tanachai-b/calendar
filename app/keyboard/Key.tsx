export function Key({
  width = 1,
  label,
  top,
  bottom,
  topRight,
  bottomRight,
  tactile,
  className,
}: {
  width?: number;
  label?: string;
  top?: string;
  bottom?: string;
  topRight?: string;
  bottomRight?: string;
  tactile?: boolean;
  className?: string;
}) {
  return (
    <div style={{ width: `${width * 70}px` }} className="h-[70px]">
      <div
        className={`group relative w-full h-full border border-bg hover:border-text_grey text-base leading-none hover:bg-bg_hover hover:text-text_white overflow-hidden ${className}`}
      >
        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-start items-start text-xs">
          {label}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-start items-start">
          {top}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-start items-end">
          {bottom}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-end items-start">
          {topRight}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-end items-end">
          {bottomRight}
        </div>

        {tactile ? (
          <div className="absolute w-full h-full px-1 py-1 flex flex-row justify-center items-end">
            <div className="w-[15px] h-[3px] bg-border group-hover:bg-text_grey rounded-full" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
