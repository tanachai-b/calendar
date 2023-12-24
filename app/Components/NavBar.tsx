import React, { usePathname, useRouter } from "next/navigation";

import { IconButton } from "./Common/IconButton";
import { Icons } from "./Common/Icons";

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex flex-wrap px-2.5">
      <IconButton
        icon={Icons.diary_large}
        text="Diary"
        active={pathname === "/diary"}
        onClick={() => router.push("/diary")}
      />

      <IconButton
        icon={Icons.habits_large}
        text="Habits"
        active={pathname === "/habits"}
        onClick={() => router.push("/habits")}
      />

      <div className="grow" />

      <IconButton icon={Icons.settings_large} text="Settings" />
    </nav>
  );
}
