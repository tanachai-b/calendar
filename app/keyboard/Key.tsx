export function Key({
  width = 1,
  center,
  leftTop,
  leftBottom,
  rightTop,
  rightBottom,
  isTactile,
}: {
  width?: number;
  center?: string;
  leftTop?: string;
  leftBottom?: string;
  rightTop?: string;
  rightBottom?: string;
  isTactile?: boolean;
}) {
  return (
    <div style={{ width: `${width * 70}px` }} className={`h-[70px]`}>
      <div className="group relative w-full h-full border border-bg hover:border-text_grey text-base leading-none hover:bg-bg_hover hover:text-text_white overflow-hidden">
        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-center items-center text-xs">
          {center}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-start items-start">
          {leftTop}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-start items-end">
          {leftBottom}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-end items-start">
          {rightTop}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-end items-end">
          {rightBottom}
        </div>

        {isTactile ? (
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
