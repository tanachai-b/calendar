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
    <div style={{ width: `${width * 60}px` }} className="h-[60px]">
      <div
        className={`group relative w-full h-full border border-bg hover:border-text_grey text-3xl font-extralight xfont-looped2 leading-none hover:bg-bg_hover hover:text-text_white overflow-hidden ${className}`}
      >
        {label ? (
          <div className="absolute left-0.5 top-0.5 text-xs font-normal">
            {label}
          </div>
        ) : (
          <></>
        )}

        {top ? <div className="absolute left-0.5 top-0.5">{top}</div> : <></>}

        {bottom ? (
          <div className="absolute left-0.5 bottom-0.5">{bottom}</div>
        ) : (
          <></>
        )}

        {topRight ? (
          <div className="absolute right-0.5 top-0.5">x{topRight}</div>
        ) : (
          <></>
        )}

        {bottomRight ? (
          <div className="absolute right-0.5 bottom-0.5">v{bottomRight}</div>
        ) : (
          <></>
        )}

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
