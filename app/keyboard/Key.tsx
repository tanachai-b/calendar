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
        className={`group relative w-full h-full border border-bg hover:border-text_grey text-base font-light leading-none hover:bg-bg_hover hover:text-text_white overflow-hidden ${className}`}
      >
        {label ? (
          <div className="absolute left-1.5 top-1.5 text-xs">{label}</div>
        ) : (
          <></>
        )}

        {top ? <div className="absolute left-1.5 top-1.5">{top}</div> : <></>}

        {bottom ? (
          <div className="absolute left-1.5 bottom-1.5">{bottom}</div>
        ) : (
          <></>
        )}

        {topRight ? (
          <div className="absolute right-1.5 top-1.5">x{topRight}</div>
        ) : (
          <></>
        )}

        {bottomRight ? (
          <div className="absolute right-1.5 bottom-1.5">v{bottomRight}</div>
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
