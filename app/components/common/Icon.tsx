export function Icon({
  className,
  icon,
}: {
  className?: string;
  icon: string;
}) {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
      />
      <span
        className={`material-symbols-rounded align-middle !leading-none ${className
          ?.trim()
          .split(/ +/)
          .map((v) => `!${v}`)
          .join(" ")}`}
      >
        {icon}
      </span>
    </div>
  );
}
