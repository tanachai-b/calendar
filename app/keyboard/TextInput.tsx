import { useEffect, useRef, useState } from "react";

import {
  getSelectionEnd,
  getSelectionStart,
  setSelection,
  setSelectionToEnd,
} from "./selectionUtils";

export function TextInput() {
  const textRef = useRef(null);

  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

  const [html, setHtml] = useState<{ __html: string }>({
    __html: "asdfg qwert zxcvb",
  });
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);

  const [lastKey, setLastKey] = useState<string>("");
  const [composing, setComposing] = useState<{
    isNew?: boolean;
    start: number;
    keys: string[];
    text: string;
    lengthDiff: number;
  }>();

  useEffect(() => {
    setShowPlaceholder(html.__html.length === 0);

    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    textArea.focus();
    setTimeout(() => setSelectionToEnd(textArea), 1);
  }, []);

  function handleTextChanged(element: HTMLElement) {
    setShowPlaceholder(element.innerText?.length === 0);

    const composingKeys = getComposingKeys(
      selectionStart,
      getSelectionStart(element)
    );
    const composingText = getComposingText(composingKeys);
    setComposing(composingText);

    setHtml({ __html: format(element.innerText, composingText) });

    const selectDiff = getSelectionStart(element) - selectionStart;
    const offset = composingText ? composingText.lengthDiff - selectDiff : 0;

    setSelectionStart(getSelectionStart(element) + offset);
    setSelectionEnd(getSelectionEnd(element) + offset);
  }

  useEffect(() => {
    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    setSelection(textArea, selectionStart, selectionEnd);
  }, [html]);

  function handleTextSelected(element: HTMLElement) {
    setSelectionStart(getSelectionStart(element));
    setSelectionEnd(getSelectionEnd(element));
  }

  function getComposingKeys(oldSelection: number, newSelection: number) {
    if (["Enter", " "].includes(lastKey)) {
      return;
    } else if (
      composing &&
      newSelection === composing.start + composing.text.length + 1
    ) {
      return {
        start: composing.start,
        keys: [...composing.keys, lastKey],
      };
    } else if (
      composing &&
      newSelection === composing.start + composing.text.length - 1
    ) {
      if (composing.keys.slice(0, -1).length === 0) return;
      return {
        start: composing.start,
        keys: composing.keys.slice(0, -1),
      };
    } else if (oldSelection + 1 === newSelection) {
      return {
        isNew: true,
        start: oldSelection,
        keys: [lastKey],
      };
    } else {
      return;
    }
  }

  function getComposingText(composingKeys?: {
    isNew?: boolean;
    start: number;
    keys: string[];
  }) {
    if (!composingKeys) return;

    const mapping: { [key: string]: string } = {
      q: "44",
    };

    const text = composingKeys.keys.map((v) => mapping[v] ?? v).join("");

    const lengthDiff = composingKeys.isNew
      ? text.length
      : text.length - (composing?.text.length ?? 0);

    return {
      isNew: composingKeys.isNew,
      start: composingKeys.start,
      keys: composingKeys.keys,
      text,
      lengthDiff,
    };
  }

  function format(
    text: string,
    composingText?: { start: number; text: string }
  ) {
    if (!composingText) return text;

    const before = text.slice(0, composingText.start);
    const after = text.slice(composingText.start + composingText.text.length);

    return before + addColor(composingText.text) + after;
  }

  function addColor(text: string) {
    return `<span style='color:#ffc000'>${text}</span>`;
  }

  return (
    <div className="h-full relative text-4xl font-extralight overflow-y-scroll">
      {showPlaceholder ? (
        <div className="absolute h-full w-full p-5 text-border">
          Type Here...
        </div>
      ) : (
        <></>
      )}

      <div
        ref={textRef}
        className="absolute h-full w-full p-5 outline-none whitespace-pre-wrap"
        contentEditable
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={html}
        onInput={(e) => handleTextChanged(e.target as HTMLElement)}
        onSelect={(e) => handleTextSelected(e.target as HTMLElement)}
        onKeyPress={(e) => setLastKey(e.key)}
      />
    </div>
  );
}
