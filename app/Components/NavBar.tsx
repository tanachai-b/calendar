import { usePathname, useRouter } from "next/navigation";

import { Icon } from "./common/Icon";
import { IconButton } from "./common/IconButton";

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex flex-wrap px-2.5">
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

      <div className="grow" />

      <IconButton
        icon={<Icon className="text-xl" icon="settings" />}
        text="Settings"
      />
    </nav>
  );
}
