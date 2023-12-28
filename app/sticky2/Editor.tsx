import { UIEvent, useMemo, useRef } from "react";

import { AutoSizeTextArea } from "./AutoSizeTextArea";
import { getScrollIndex, scrollToIndex } from "./scrollUtils";
import { FormattedLine } from "./FormattedLine";

export function Editor({
  inputText,
  onChange,
}: {
  inputText: string;
  onChange: (value: string) => void;
}) {
  const lines = useMemo(() => inputText.split("\n"), [inputText]);

  const previewRef = useRef(null);
  const textLinesRef = useRef(null);
  const textScrollRef = useRef(null);

  function handleTextScrolled(e: UIEvent) {
    const textScroll = e.target as HTMLElement;
    if (!textScroll.matches(":hover")) return;
    if (!textLinesRef.current || !previewRef.current) return;

    const scrollIndex = getScrollIndex(textLinesRef.current, textScroll);
    scrollToIndex(previewRef.current, previewRef.current, scrollIndex);
  }

  function handlePreviewScrolled(e: UIEvent) {
    const preview = e.target as HTMLElement;
    if (!preview.matches(":hover")) return;
    if (!textLinesRef.current || !textScrollRef.current) return;

    const scrollIndex = getScrollIndex(preview, preview);
    scrollToIndex(textLinesRef.current, textScrollRef.current, scrollIndex);
  }

  return (
    <div className="flex flex-row h-full divide-x divide-border overflow-hidden">
      <div
        ref={previewRef}
        onScroll={handlePreviewScrolled}
        className="flex-1 overflow-y-scroll overflow-x-hidden"
      >
        {lines.map((line, index) => (
          <FormattedLine key={index} line={line} />
        ))}
      </div>

      <div
        ref={textScrollRef}
        onScroll={handleTextScrolled}
        className="flex-1 text-base overflow-y-auto"
      >
        <AutoSizeTextArea
          textLinesRef={textLinesRef}
          text={inputText}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
