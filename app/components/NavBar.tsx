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
        active={pathname === "/sticky2"}
        onClick={() => router.push("/sticky2")}
      />

      <div className="grow" />

      <IconButton
        icon={<Icon className="text-xl" icon="open_in_browser" />}
        text="File System Testing"
        active={pathname === "/fileSystem"}
        onClick={() => router.push("/fileSystem")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="table" />}
        text="Table Interpreter"
        active={pathname === "/table"}
        onClick={() => router.push("/table")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="calendar_today" />}
        text="Calendar"
        active={pathname === "/diary"}
        onClick={() => router.push("/diary")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="draw" />}
        text="Beautiful Sticky"
        active={pathname === "/sticky"}
        onClick={() => router.push("/sticky")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="delete" />}
        text="Obsolete"
        active={pathname === "/habits"}
        onClick={() => router.push("/habits")}
      />
    </nav>
  );
}
