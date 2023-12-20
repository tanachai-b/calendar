import React from "react";
import { LeftBar } from "./LeftBar/LeftBar";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch h-screen">
      <MenuBar />

      <div className="grow overflow-hidden flex flex-row items-stretch">
        <LeftBar />

        <div className="grow">x</div>
      </div>
    </div>
  );
}

function MenuBar() {
  return (
    <div className="flex flex-row border-b border-yellow">
      <button>Today</button>
    </div>
  );
}
