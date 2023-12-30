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

  function handleTextChanged(element: HTMLElement) {
    setShowPlaceholder(element.innerText?.length === 0);

    setHtml({ __html: format(element.innerText) });
    setSelectionStart(getSelectionStart(element));
    setSelectionEnd(getSelectionEnd(element));
  }

  function format(text: string) {
    const result = ` ${text} `
      .replace(/(?<=\W)(test)(?=\W)/g, "<span style='color:#ffc000'>$1</span>")
      .slice(1, -1);
    return result;
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
    <div className="h-full flex flex-col">
      <button onClick={buttonclik}>hasdfkl</button>

      <div className="grow relative text-4xl font-extralight overflow-y-scroll">
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
