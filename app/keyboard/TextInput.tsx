import { useEffect, useRef, useState } from "react";

import {
  getSelectionEnd,
  getSelectionStart,
  setSelection,
} from "./selectionUtils";

export function TextInput({
  onTextChanged,
}: {
  onTextChanged?: (
    html: string,
    oldSelection: number,
    newSelection: number,
    key: string
  ) => { newHtml: string; selectionOffset: number } | undefined;
}) {
  const textRef = useRef(null);

  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

  const [html, setHtml] = useState<{ __html: string }>({
    __html: "",
  });
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    setShowPlaceholder(html.__html.length === 0);

    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    textArea.focus();
    // setTimeout(() => setSelectionToEnd(textArea), 1);
  }, []);

  function handleTextChanged(element: HTMLElement) {
    setShowPlaceholder(element.innerText?.length === 0);

    const { newHtml, selectionOffset } =
      onTextChanged?.(
        element.innerText,
        selectionStart,
        getSelectionStart(element),
        key
      ) ?? {};

    if (newHtml != null && selectionOffset != null) {
      setHtml({ __html: newHtml });

      setSelectionStart(getSelectionStart(element) + selectionOffset);
      setSelectionEnd(getSelectionEnd(element) + selectionOffset);
    } else {
      setHtml({ __html: element.innerText });

      setSelectionStart(getSelectionStart(element));
      setSelectionEnd(getSelectionEnd(element));
    }
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
        onKeyPress={(e) => setKey(e.key)}
      />
    </div>
  );
}
