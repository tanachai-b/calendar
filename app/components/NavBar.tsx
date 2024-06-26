import { usePathname, useRouter } from "next/navigation";

import { Icon, IconButton } from "./common";

export function NavBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className={`flex flex-wrap px-2.5 ${className}`}>
      <IconButton
        icon={<Icon className="text-xl" icon="account_balance" />}
        text="Finance"
        active={pathname === "/finance"}
        onClick={() => router.push("/finance")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="palette" />}
        text="Color Palette"
        active={pathname === "/color-palette"}
        onClick={() => router.push("/color-palette")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="palette" />}
        text="Color Picker"
        active={pathname === "/color-picker"}
        onClick={() => router.push("/color-picker")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="cached" />}
        text="Spinner"
        active={pathname === "/spinner"}
        onClick={() => router.push("/spinner")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="schedule" />}
        text="Bevel Emboss"
        active={pathname === "/bevel-emboss"}
        onClick={() => router.push("/bevel-emboss")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="schedule" />}
        text="Digital Clock"
        active={pathname === "/digital-clock"}
        onClick={() => router.push("/digital-clock")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="watch" />}
        text="Watch"
        active={pathname === "/watch"}
        onClick={() => router.push("/watch")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="sticky_note" />}
        text="Sticky Notes"
        active={pathname === "/sticky-notes"}
        onClick={() => router.push("/sticky-notes")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="difference" />}
        text="Text Diff"
        active={pathname === "/text-diff"}
        onClick={() => router.push("/text-diff")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="keyboard" />}
        text="Keyboard"
        active={pathname === "/keyboard"}
        onClick={() => router.push("/keyboard")}
      />

      <div className="grow" />

      <IconButton
        icon={<Icon className="text-xl" icon="partly_cloudy_day" />}
        text="Diary Reader"
        active={pathname === "/diary-reader"}
        onClick={() => router.push("/diary-reader")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="table" />}
        text="Table"
        active={pathname === "/table"}
        onClick={() => router.push("/table")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="calendar_today" />}
        text="Calendar"
        active={pathname === "/calendar"}
        onClick={() => router.push("/calendar")}
      />
    </nav>
  );
}
