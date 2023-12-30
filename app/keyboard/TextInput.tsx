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
    lengthDiff: number;
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

    setHtml({
      __html: replaceText(
        element.innerText,
        getSelectionStart(element),
        composingText
      ),
    });

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
    const clearedTonx = removeMarkers(combinedTones);

    const text = clearedTonx.join("");

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

  function replaceText(
    text: string,
    selectionEnd: number,
    composingText?: { start: number; text: string }
  ) {
    if (!composingText) return text;

    const before = text.slice(0, composingText.start);
    const after = text.slice(selectionEnd);

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
        onKeyPress={(e) => setKey(e.key)}
      />
    </div>
  );
}
