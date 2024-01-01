import { useEffect, useRef, useState } from "react";

import { consonantMappings } from "./keyMappings";
import {
  getSelectionEnd,
  getSelectionStart,
  setSelection,
} from "./selectionUtils";
import {
  applyDoubleStroke,
  combineConsonants,
  combineVowels,
  combineEndings,
  combineTones,
  removeMarkers,
} from "./linguisticUtils";

export function TextInput() {
  const textRef = useRef(null);

  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

  const [html, setHtml] = useState<{ __html: string }>({
    __html: "",
  });
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);

  const [key, setKey] = useState<string>("");
  const [composing, setComposing] = useState<{
    isNew?: boolean;
    start: number;
    keys: string[];
    text: string;
  }>();

  useEffect(() => {
    setShowPlaceholder(html.__html.length === 0);

    if (!textRef.current) return;
    const textArea = textRef.current as HTMLElement;

    textArea.focus();
    // setTimeout(() => setSelectionToEnd(textArea), 1);
  }, []);

  function handleTextChanged(element: HTMLElement) {
    setShowPlaceholder(element.innerText?.length === 0);

    const composingKeys = getComposingKeys(
      selectionStart,
      getSelectionStart(element)
    );
    const composingText = getComposingText(composingKeys);
    setComposing(composingText);

    if (composingText) {
      setHtml({
        __html: replaceText(
          element.innerText,
          composingText.text,
          composingText.start,
          getSelectionStart(element)
        ),
      });

      const selectDiff = getSelectionStart(element) - selectionStart;

      const composingDiff = composingText.isNew
        ? composingText.text.length
        : composingText.text.length - (composing?.text.length ?? 0);

      const offset = composingDiff - selectDiff;

      setSelectionStart(getSelectionStart(element) + offset);
      setSelectionEnd(getSelectionEnd(element) + offset);
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

  function getComposingKeys(oldSelection: number, newSelection: number) {
    if (!Object.keys(consonantMappings).includes(key)) {
      return;
    } else if (
      composing &&
      newSelection === composing.start + composing.text.length + 1
    ) {
      return {
        start: composing.start,
        keys: [...composing.keys, key],
      };
    } else if (
      composing &&
      newSelection === composing.start + composing.text.length - 1 &&
      composing.text.length - 1 >= 0
    ) {
      return {
        start: composing.start,
        keys: composing.keys.slice(0, -1),
      };
    } else if (oldSelection + 1 === newSelection) {
      return {
        isNew: true,
        start: oldSelection,
        keys: [key],
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

    const appliedDoubleStroke = applyDoubleStroke(composingKeys.keys);
    const combinedConsonant = combineConsonants(appliedDoubleStroke);
    const combinedVowels = combineVowels(combinedConsonant);
    const combinedEndings = combineEndings(combinedVowels);
    const combinedTones = combineTones(combinedEndings);
    const removedMarkers = removeMarkers(combinedTones);

    const text = removedMarkers.join(" | ");

    return {
      isNew: composingKeys.isNew,
      start: composingKeys.start,
      keys: composingKeys.keys,
      text,
    };
  }

  function replaceText(
    text: string,
    replace: string,
    start: number,
    end: number
  ) {
    const before = text.slice(0, start);
    const after = text.slice(end);

    return before + addColor(replace) + after;
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
        onKeyPress={(e) => setKey(e.key)}
      />
    </div>
  );
}
