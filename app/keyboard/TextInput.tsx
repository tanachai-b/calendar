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
  const [processing, setProcessing] = useState<{
    start: number;
    text: string;
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

    const newProcessing = handleKeyInput(element);
    setProcessing(newProcessing);

    setHtml({ __html: format(element.innerText, newProcessing) });
    setSelectionStart(getSelectionStart(element));
    setSelectionEnd(getSelectionEnd(element));
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

  function handleKeyInput(element: HTMLElement) {
    if (
      !processing ||
      processing.start + processing.text.length + 1 !==
        getSelectionStart(element)
    ) {
      if (getSelectionStart(element) !== selectionStart + 1) return;

      const key = element.innerText.slice(
        selectionStart,
        getSelectionStart(element)
      );

      return { start: selectionStart, text: key };
    } else {
      const key = element.innerText.slice(
        selectionStart,
        getSelectionStart(element)
      );

      return { start: processing.start, text: processing?.text + key };
    }
  }

  function format(text: string, processing?: { start: number; text: string }) {
    if (!processing) return text;

    const before = text.slice(0, processing.start);
    const after = text.slice(processing.start + processing.text.length);

    return before + addColor(processing.text) + after;
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
