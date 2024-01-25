import { usePathname, useRouter } from "next/navigation";

import { Icon, IconButton } from "./common";

export function NavBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className={`flex flex-wrap px-2.5 ${className}`}>
      <IconButton
        icon={<Icon className="text-xl" icon="sticky_note" />}
        text="Sticky Notes"
        active={pathname === "/sticky-notes"}
        onClick={() => router.push("/sticky-notes")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="keyboard" />}
        text="Keyboard"
        active={pathname === "/keyboard"}
        onClick={() => router.push("/keyboard")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="difference" />}
        text="Text Diff"
        active={pathname === "/text-diff"}
        onClick={() => router.push("/text-diff")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="sticky_note" />}
        text="Sticky"
        active={pathname === "/sticky"}
        onClick={() => router.push("/sticky")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="draw" />}
        text="Draw"
        active={pathname === "/draw"}
        onClick={() => router.push("/draw")}
      />

      <div className="grow" />

      <IconButton
        icon={<Icon className="text-xl" icon="open_in_browser" />}
        text="File System"
        active={pathname === "/file-system"}
        onClick={() => router.push("/file-system")}
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

      <IconButton
        icon={<Icon className="text-xl" icon="draw" />}
        text="Obsolete Sticky"
        active={pathname === "/obsolete-sticky"}
        onClick={() => router.push("/obsolete-sticky")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="delete" />}
        text="Obsolete"
        active={pathname === "/obsolete"}
        onClick={() => router.push("/obsolete")}
      />
    </nav>
  );
}
