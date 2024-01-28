import { usePathname, useRouter } from "next/navigation";

import { Icon, IconButton } from "./common";

export function NavBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className={`flex flex-wrap px-2.5 ${className}`}>
      <IconButton
        icon={<Icon className="text-xl" icon="schedule" />}
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
