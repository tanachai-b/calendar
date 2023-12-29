"use client";

import { NavBar } from "../components";

export default function KeyboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <TextInput />

      <div className="border-t border-border flex flex-row justify-center overflow-auto p-5">
        <Keyboard />
      </div>
    </div>
  );
}

function TextInput() {
  return <div className="grow">TextInput</div>;
}

const x = [
  { leftTop: "~", leftBottom: "`" },
  { leftTop: "!", leftBottom: "1" },
  { leftTop: "@", leftBottom: "2" },
  { leftTop: "#", leftBottom: "3" },
  { leftTop: "$", leftBottom: "4" },
  { leftTop: "%", leftBottom: "5" },
  { leftTop: "^", leftBottom: "6" },
  { leftTop: "&", leftBottom: "7" },
  { leftTop: "*", leftBottom: "8" },
  { leftTop: "(", leftBottom: "9" },
  { leftTop: ")", leftBottom: "0" },
  { leftTop: "_", leftBottom: "-" },
  { leftTop: "+", leftBottom: "=" },
  { leftTop: "Q", leftBottom: "" },
  { leftTop: "W", leftBottom: "" },
  { leftTop: "E", leftBottom: "" },
  { leftTop: "R", leftBottom: "" },
  { leftTop: "T", leftBottom: "" },
  { leftTop: "Y", leftBottom: "" },
  { leftTop: "U", leftBottom: "" },
  { leftTop: "I", leftBottom: "" },
  { leftTop: "O", leftBottom: "" },
  { leftTop: "P", leftBottom: "" },
  { leftTop: "{", leftBottom: "[" },
  { leftTop: "}", leftBottom: "]" },
  { leftTop: "|", leftBottom: "\\" },
  { leftTop: "A", leftBottom: "" },
  { leftTop: "S", leftBottom: "" },
  { leftTop: "D", leftBottom: "" },
  { leftTop: "F", leftBottom: "" },
  { leftTop: "G", leftBottom: "" },
  { leftTop: "H", leftBottom: "" },
  { leftTop: "J", leftBottom: "" },
  { leftTop: "K", leftBottom: "" },
  { leftTop: "L", leftBottom: "" },
  { leftTop: ":", leftBottom: ";" },
  { leftTop: '"', leftBottom: "'" },
  { leftTop: "Z", leftBottom: "" },
  { leftTop: "X", leftBottom: "" },
  { leftTop: "C", leftBottom: "" },
  { leftTop: "V", leftBottom: "" },
  { leftTop: "B", leftBottom: "" },
  { leftTop: "N", leftBottom: "" },
  { leftTop: "M", leftBottom: "" },
  { leftTop: "<", leftBottom: "," },
  { leftTop: ">", leftBottom: "." },
  { leftTop: "?", leftBottom: "/" },
];

function Keyboard() {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex flex-col divide-y divide-border">
        <div className="flex flex-row divide-x divide-border">
          <Key leftTop="~" leftBottom="`" />

          <Key leftTop="!" leftBottom="1" />
          <Key leftTop="@" leftBottom="2" />
          <Key leftTop="#" leftBottom="3" />
          <Key leftTop="$" leftBottom="4" />
          <Key leftTop="%" leftBottom="5" />
          <Key leftTop="^" leftBottom="6" />
          <Key leftTop="&" leftBottom="7" />
          <Key leftTop="*" leftBottom="8" />
          <Key leftTop="(" leftBottom="9" />
          <Key leftTop=")" leftBottom="0" />

          <Key leftTop="_" leftBottom="-" />
          <Key leftTop="+" leftBottom="=" />
          <Key center="Backspace" width={2} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key center="Tab" width={1.5} />

          <Key leftTop="Q" leftBottom="" />
          <Key leftTop="W" leftBottom="" />
          <Key leftTop="E" leftBottom="" />
          <Key leftTop="R" leftBottom="" />
          <Key leftTop="T" leftBottom="" />
          <Key leftTop="Y" leftBottom="" />
          <Key leftTop="U" leftBottom="" />
          <Key leftTop="I" leftBottom="" />
          <Key leftTop="O" leftBottom="" />
          <Key leftTop="P" leftBottom="" />

          <Key leftTop="{" leftBottom="[" />
          <Key leftTop="}" leftBottom="]" />
          <Key leftTop="|" leftBottom="\" width={1.5} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key center="Caps" width={1.75} />

          <Key leftTop="A" leftBottom="" />
          <Key leftTop="S" leftBottom="" />
          <Key leftTop="D" leftBottom="" />
          <Key leftTop="F" leftBottom="" isTactile={true} />
          <Key leftTop="G" leftBottom="" />
          <Key leftTop="H" leftBottom="" />
          <Key leftTop="J" leftBottom="" isTactile={true} />
          <Key leftTop="K" leftBottom="" />
          <Key leftTop="L" leftBottom="" />
          <Key leftTop=":" leftBottom=";" />

          <Key leftTop='"' leftBottom="'" />
          <Key center="Enter" width={2.25} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key center="Shift" width={2.25} />

          <Key leftTop="Z" leftBottom="" />
          <Key leftTop="X" leftBottom="" />
          <Key leftTop="C" leftBottom="" />
          <Key leftTop="V" leftBottom="" />
          <Key leftTop="B" leftBottom="" />
          <Key leftTop="N" leftBottom="" />
          <Key leftTop="M" leftBottom="" />
          <Key leftTop="<" leftBottom="," />
          <Key leftTop=">" leftBottom="." />
          <Key leftTop="?" leftBottom="/" />

          <Key center="Shift" width={2.75} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key width={1.25} center="Ctrl" />
          <Key width={1.25} center="Win" />
          <Key width={1.25} center="Alt" />

          <Key width={6.25} center="Space" />

          <Key width={1.25} center="Alt" />
          <Key width={1.25} center="Win" />
          <Key width={1.25} center="Menu" />
          <Key width={1.25} center="Ctrl" />
        </div>
      </div>
    </div>
  );
}

function Key({
  width = 1,
  center,
  leftTop,
  leftBottom,
  rightTop,
  rightBottom,
  isTactile,
}: {
  width?: number;
  center?: string;
  leftTop?: string;
  leftBottom?: string;
  rightTop?: string;
  rightBottom?: string;
  isTactile?: boolean;
}) {
  return (
    <div style={{ width: `${width * 70}px` }} className={`h-[70px]`}>
      <div className="group relative w-full h-full border border-bg hover:border-text_grey text-base leading-none hover:bg-bg_hover hover:text-text_white">
        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-center items-center text-xs">
          {center}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-start items-start">
          {leftTop}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-start items-end">
          {leftBottom}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-end items-start">
          {rightTop}
        </div>

        <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-end items-end">
          {rightBottom}
        </div>

        {isTactile ? (
          <div className="absolute w-full h-full px-1 py-1 flex flex-row justify-center items-end">
            <div className="w-[15px] h-[3px] bg-border group-hover:bg-text_grey rounded-full" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
