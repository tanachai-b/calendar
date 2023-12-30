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

  useEffect(() => {
    setShowPlaceholder(html.__html.length === 0);

    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    textArea.focus();
    setTimeout(() => setSelectionToEnd(textArea), 1);
  }, []);

  async function handleTextChanged(element: HTMLElement) {
    setShowPlaceholder(element.innerText?.length === 0);

    setHtml({ __html: element.innerText });
    setSelectionStart(getSelectionStart(element));
    setSelectionEnd(getSelectionEnd(element));
  }

  useEffect(() => {
    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    setSelection(textArea, selectionStart, selectionEnd);
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
          className="absolute h-full w-full p-5 outline-none whitespace-pre"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => handleTextChanged(e.target as HTMLElement)}
          dangerouslySetInnerHTML={html}
        />
      </div>
    </div>
  );
}
