"use client";

import { useMemo, useState } from "react";
import { NavBar } from "../components";

export default function TextDiff() {
  const [textA, setTextA] = useState(
    "I'm testing the text diff algorithm qwer asdf to make a new text comparator. Just trying to make sense of how things work."
  );
  const [textB, setTextB] = useState(
    "I'm testing the text diff algorithm zxcv to make a new text comparator. Just trying to make sense of how things work."
  );
  const diff = useMemo(
    () => Array.from(textA).map((a) => Array.from(textB).map((b) => b === a)),
    [textA, textB]
  );

  const diff2 = useMemo(
    () =>
      Array.from(diff).map((diffDeep, iA) =>
        Array.from(diffDeep).map((value, iB) => {
          const before = iA > 1 && iB > 1 && diff[iA - 1][iB - 1];
          const after =
            iA < diff.length - 1 &&
            iB < diffDeep.length - 1 &&
            diff[iA + 1][iB + 1];

          if (!before && !after) {
            return false;
          }

          return value;
        })
      ),
    [diff]
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="flex flex-col p-5 gap-5 border-b border-border">
        <TextBox value={textA} placeholder="Text 1" onChange={setTextA} />

        <TextBox value={textB} placeholder="Text 2" onChange={setTextB} />
      </div>

      <div className="grow overflow-scroll">
        <div className="w-fit h-fit p-5">
          <div className="flex flex-row">
            <HeaderCell />
            {Array.from(textA).map((value, index) => (
              <HeaderCell key={index} text={value} />
            ))}
          </div>

          <div className="flex flex-row">
            <div className="flex flex-col">
              {Array.from(textB).map((value, index) => (
                <HeaderCell key={index} text={value} />
              ))}
            </div>

            {Array.from(diff2).map((diffDeep, index) => (
              <div key={index} className="flex flex-col">
                {Array.from(diffDeep).map((value, index) => (
                  <DiffCell key={index} value={value} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderCell({ text }: { text?: string }) {
  return (
    <div className="w-2 h-2 border border-bg_hover flex items-center justify-center">
      {text}
    </div>
  );
}

function DiffCell({ value }: { value: boolean }) {
  return (
    <div
      className={`w-2 h-2 border border-bg_hover flex items-center justify-center ${
        value ? "bg-text_red" : ""
      }`}
    />
  );
}

function TextBox({
  value: value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      className="p-2.5 rounded outline-none text-text_grey bg-bg_hover placeholder:text-text_grey focus:text-text_white border border-transparent focus:border-border"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
