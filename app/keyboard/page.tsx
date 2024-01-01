"use client";

import { useMemo, useState } from "react";
import { NavBar } from "../components";
import { ModifiedInput } from "./ModifiedInput/ModifiedInput";
import { Keyboard } from "./VisualKeyboard/Keyboard";
import {
  KeyboardLayout,
  consonantsLayout,
  vowelsLayout,
} from "./VisualKeyboard/keyboardLayouts";
import { consonantMappings, vowelMappings } from "./ModifiedInput/keyMappings";

export default function KeyboardPage() {
  const [nextType, setNextType] = useState<"consonant" | "vowel">("consonant");

  const keyboardLayout = useMemo(
    () => (nextType === "consonant" ? consonantsLayout : vowelsLayout),
    [nextType]
  );

  const keyMapping = useMemo(
    () => (nextType === "consonant" ? consonantMappings : vowelMappings),
    [nextType]
  );

  const keyboardLayoutX = useMemo(() => {
    console.log(
      Object.keys(keyMapping).reduce((prev, curr) => {
        return { ...prev, [curr]: keyMapping[curr].key };
      }, {})
    );
    return Object.keys(keyMapping).reduce<KeyboardLayout>((prev, curr) => {
      return {
        ...prev,
        [curr]: { top: keyMapping[curr].key.replace(/^.+?_/, "") },
      };
    }, {});
  }, [keyMapping]);

  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="grow">
        <ModifiedInput onChanged={setNextType} />
      </div>

      <div className="shrink-0 border-t border-border flex flex-row justify-center overflow-auto p-5">
        <Keyboard layout={keyboardLayoutX} />
      </div>
    </div>
  );
}
