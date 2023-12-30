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

      <div className="shrink-0 border-t border-border flex flex-row justify-center overflow-auto p-5">
        <Keyboard />
      </div>
    </div>
  );
}

function TextInput() {
  const textRef = useRef(null);

  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

  const [html, setHtml] = useState<{ __html: string }>({
    __html: "asdfg qwert zxcvb",
  });
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);

  useEffect(() => {
    setShowPlaceholder(html.__html.length === 0);

    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    textArea.focus();
    setTimeout(() => setSelectionToEnd(textArea), 1);
  }, []);

  async function handleTextChanged(element: HTMLElement) {
    setShowPlaceholder(element.textContent?.length === 0);

    setHtml({ __html: element.innerHTML });
    setSelectionStart(getSelectionStart(element));
    setSelectionEnd(getSelectionEnd(element));
  }

  useEffect(() => {
    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    const { childNode: startChildNode, offset: startOffset } =
      getChildAtPosition(textArea, selectionStart);
    const { childNode: endChildNode, offset: endOffset } = getChildAtPosition(
      textArea,
      selectionEnd
    );

    if (!startChildNode) return;
    if (!selectionEnd) return;

    const range = document.createRange();
    range.setStart(startChildNode, startOffset);
    range.setEnd(endChildNode, endOffset);

    const selection = window.getSelection();
    if (!selection) return;

    selection.removeAllRanges();
    selection.addRange(range);
  }, [html]);

  function buttonclik(): void {
    setHtml({ __html: "<b>asdf</b>" });
  }

  return (
    <div className="h-full">
      <button onClick={buttonclik}>hasdfkl</button>

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
          dangerouslySetInnerHTML={html}
        />
      </div>
    </div>
  );
}

function getFlatChildNodes(element: HTMLElement): ChildNode[] {
  return Array.from(element.childNodes).reduce<ChildNode[]>((prev, curr) => {
    if (curr.childNodes.length === 0) {
      return [...prev, curr];
    } else {
      return [...prev, ...getFlatChildNodes(curr as HTMLElement)];
    }
  }, []);
}

function getChildAtPosition(element: HTMLElement, position: number) {
  const flatChildNodes = getFlatChildNodes(element);

  const accumTextLengths = flatChildNodes.reduce(
    (prev, curr) => [
      ...prev,
      prev[prev.length - 1] + (curr.textContent?.length ?? 0),
    ],
    [0]
  );
  const childIndex = accumTextLengths.findLastIndex((v) => v < position);

  return {
    childNode: flatChildNodes[childIndex],
    offset: position - accumTextLengths[childIndex],
  };
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

function getSelectionStart(element: HTMLElement): number {
  const selection = window.getSelection();
  if (!selection) return -1;
  const range = selection.getRangeAt(0);

  const tempRange = document.createRange();
  tempRange.setStart(element, 0);
  tempRange.setEnd(range.startContainer, range.startOffset);

  return tempRange.toString().length;
}

function getSelectionEnd(element: HTMLElement): number {
  const selection = window.getSelection();
  if (!selection) return -1;
  const range = selection.getRangeAt(0);

  const tempRange = document.createRange();
  tempRange.setStart(element, 0);
  tempRange.setEnd(range.endContainer, range.endOffset);

  return tempRange.toString().length;
}
