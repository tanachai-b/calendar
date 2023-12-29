"use client";

import { NavBar } from "../components";

export default function KeyboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <TextInput />

      <div className="p-5 w-full flex flex-row justify-center border-t border-border">
        <Keyboard />
      </div>
    </div>
  );
}

function TextInput() {
  return <div className="grow">TextInput</div>;
}

function Keyboard() {
  return (
    <div className="shrink-0 w-[calc(70px*15+1px)] h-[calc(70px*5+1px)] border border-border rounded-xl overflow-hidden">
      <div className="flex flex-wrap w-[calc(70px*15+2px)]">
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
        <Key width={2} center="Backspace" />

        <Key width={1.5} center="Tab" />

        <Key leftTop="Q" />
        <Key leftTop="W" />
        <Key leftTop="E" />
        <Key leftTop="R" />
        <Key leftTop="T" />
        <Key leftTop="Y" />
        <Key leftTop="U" />
        <Key leftTop="I" />
        <Key leftTop="O" />
        <Key leftTop="P" />

        <Key leftTop="{" leftBottom="[" />
        <Key leftTop="}" leftBottom="]" />
        <Key width={1.5} leftTop="|" leftBottom="\" />

        <Key width={1.75} center="Caps" />

        <Key leftTop="A" />
        <Key leftTop="S" />
        <Key leftTop="D" />
        <Key leftTop="F" />
        <Key leftTop="G" />
        <Key leftTop="H" />
        <Key leftTop="J" />
        <Key leftTop="K" />
        <Key leftTop="L" />
        <Key leftTop=":" leftBottom=";" />

        <Key leftTop='"' leftBottom="'" />
        <Key width={2.25} center="Enter" />

        <Key width={2.25} center="Shift" />

        <Key leftTop="Z" />
        <Key leftTop="X" />
        <Key leftTop="C" />
        <Key leftTop="V" />
        <Key leftTop="B" />
        <Key leftTop="N" />
        <Key leftTop="M" />
        <Key leftTop="<" leftBottom="," />
        <Key leftTop=">" leftBottom="." />
        <Key leftTop="?" leftBottom="/" />

        <Key width={2.75} center="Shift" />

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
  );
}

function Key({
  width = 1,
  center,
  leftTop,
  leftBottom,
  rightTop,
  rightBottom,
}: {
  width?: number;
  center?: string;
  leftTop?: string;
  leftBottom?: string;
  rightTop?: string;
  rightBottom?: string;
}) {
  return (
    <div
      style={{ width: `${width * 70}px` }}
      className={`relative h-[70px] border-r border-b border-border text-base leading-none hover:bg-bg_hover hover:text-text_white`}
    >
      <div className="absolute w-full h-full px-2 py-2 flex flex-row justify-center items-center text-sm">
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
    </div>
  );
}
