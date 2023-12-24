"use client";

import { useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { tryData } from "./tryData";

export default function Habits() {
  useEffect(() => tryData(), []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
    </div>
  );
}
