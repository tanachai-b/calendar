"use client";

import { useMemo, useState } from "react";
import { NavBar } from "../components";
import { ModifiedInput } from "./ModifiedInput/ModifiedInput";
import { Keyboard } from "./VisualKeyboard/Keyboard";
import {
  KeyboardLayout,
  consonantShiftsLayout,
  consonantsLayout,
  vowelShiftsLayout,
  vowelsLayout,
} from "./VisualKeyboard/keyboardLayouts";
import { consonantMappings, vowelMappings } from "./ModifiedInput/keyMappings";

export default function KeyboardPage() {
  const [nextType, setNextType] = useState<"consonant" | "vowel">("consonant");
  const [shiftDown, setShiftDown] = useState<boolean>(false);

  const keyboardLayout = useMemo(() => {
    if (nextType === "consonant") {
      return !shiftDown ? consonantsLayout : consonantShiftsLayout;
    } else {
      return !shiftDown ? vowelsLayout : vowelShiftsLayout;
    }
  }, [nextType, shiftDown]);

  return (
    <div className="flex flex-col h-full">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="grow">
        <ModifiedInput onChanged={setNextType} onShiftChanged={setShiftDown} />
      </div>

      <div className="shrink-0 border-t border-border flex flex-row justify-center overflow-auto p-5">
        <Keyboard layout={keyboardLayout} />
      </div>
    </div>
  );
}
