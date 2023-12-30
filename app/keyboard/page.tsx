"use client";

import { useEffect, useRef, useState } from "react";
import { NavBar } from "../components";
import { Keyboard } from "./Keyboard";

export default function KeyboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="grow">
        <TextInput />
      </div>

      <button onClick={buttonclik}>hasdfkl</button>

      <div className="shrink-0 border-t border-border flex flex-row justify-center overflow-auto p-5">
        <Keyboard />
      </div>
    </div>
  );
}

function buttonclik(): void {
  const selection = window.getSelection();
  if (!selection) return;

  const range = selection.getRangeAt(0);
  range.deleteContents();

  selection.removeAllRanges();
  selection.addRange(range);
}

function TextInput() {
  const textRef = useRef(null);

  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);
  const [text, setText] = useState<string>("asdfg qwert zxcvb");

  useEffect(() => {
    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    textArea.textContent = text;
    textArea.focus();
    setSelectionToEnd(textRef.current);

    setShowPlaceholder(text.length === 0);
  }, []);

  function handleTextChanged(element: HTMLElement) {
    setText(element.textContent ?? "");
    setShowPlaceholder(element.textContent?.length === 0);
  }

  function handleSelectionChanged() {
    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    const selectionStart = getSelectionStart(textArea);

    console.log("selectionStart", selectionStart);
  }

  return (
    <div className="h-full relative text-4xl font-extralight">
      {showPlaceholder ? (
        <div className="absolute h-full w-full p-5 text-border">
          Type Here...
        </div>
      ) : (
        <></>
      )}

      <div
        ref={textRef}
        className="absolute h-full w-full p-5 outline-none"
        contentEditable
        suppressContentEditableWarning={true}
        onInput={(e) => handleTextChanged(e.target as HTMLElement)}
        onSelect={(e) => handleSelectionChanged()}
      >
        {/* {text} */}
      </div>
    </div>
  );
}

function setSelectionToEnd(element: HTMLElement) {
  const range = document.createRange();
  range.setStart(element, 1);
  range.collapse(true);

  const selection = window.getSelection();
  if (!selection) return;
  selection.removeAllRanges();
  selection.addRange(range);
}

function getSelectionStart(element: HTMLElement) {
  const selection = window.getSelection();
  if (!selection) return;
  const range = selection.getRangeAt(0);

  const tempRange = document.createRange();
  tempRange.setStart(element, 0);
  tempRange.setEnd(range.startContainer, range.startOffset);

  return tempRange.toString().length;
}

function getSelectionEnd(element: HTMLElement) {
  const selection = window.getSelection();
  if (!selection) return;
  const range = selection.getRangeAt(0);

  const tempRange = document.createRange();
  tempRange.setStart(element, 0);
  tempRange.setEnd(range.endContainer, range.endOffset);

  return tempRange.toString().length;
}
