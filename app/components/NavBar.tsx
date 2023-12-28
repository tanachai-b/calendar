import { usePathname, useRouter } from "next/navigation";

import { Icon, IconButton } from "./common";

export function NavBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className={`flex flex-wrap px-2.5 ${className}`}>
      <IconButton
        icon={<Icon className="text-xl" icon="partly_cloudy_day" />}
        text="Diary"
        active={pathname === "/diary"}
        onClick={() => router.push("/diary")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="directions_bike" />}
        text="Habits"
        active={pathname === "/habits"}
        onClick={() => router.push("/habits")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="directions_bike" />}
        text="Sticky"
        active={pathname === "/sticky"}
        onClick={() => router.push("/sticky")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="directions_bike" />}
        text="Sticky 2"
        active={pathname === "/sticky2"}
        onClick={() => router.push("/sticky2")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="directions_bike" />}
        text="Table"
        active={pathname === "/table"}
        onClick={() => router.push("/table")}
      />

      <IconButton
        icon={<Icon className="text-xl" icon="directions_bike" />}
        text="File System"
        active={pathname === "/fileSystem"}
        onClick={() => router.push("/fileSystem")}
      />

      <div className="grow" />

      <IconButton
        icon={<Icon className="text-xl" icon="settings" />}
        text="Settings"
      />
    </nav>
  );
}
