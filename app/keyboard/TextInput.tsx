import { useEffect, useRef, useState } from "react";

import { consonantMappings, vowelMappings } from "./keyMappings";
import {
  getSelectionEnd,
  getSelectionStart,
  setSelection,
} from "./selectionUtils";

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

function applyDoubleStroke(keys: string[]) {
  const appliedDoubleStroke = keys.reduce<
    { key: string; type: string; switch: boolean }[]
  >((prev, key) => {
    const consonant = consonantMappings[key] ?? { key: key, switchx: true };
    const vowel = vowelMappings[key] ?? { key: key, switchx: true };

    if (prev.length === 0) {
      return [
        { key: consonant.key, type: "consonant", switch: consonant.switch },
      ];
    }

    const last = prev[prev.length - 1];

    if (last.type === "consonant") {
      if (last.switch) {
        return [
          ...prev,
          { key: vowel.key, type: "vowel", switch: vowel.switch },
        ];
      } else if (!last.switch) {
        return [
          ...prev,
          { key: consonant.key, type: "consonant", switch: consonant.switch },
        ];
      }
    } else if (last.type === "vowel") {
      if (last.switch) {
        return [
          ...prev,
          { key: consonant.key, type: "consonant", switch: consonant.switch },
        ];
      } else if (!last.switch) {
        return [
          ...prev,
          { key: vowel.key, type: "vowel", switch: vowel.switch },
        ];
      }
    }

    return [...prev];
  }, []);

  return appliedDoubleStroke.map(({ key }) => key);
}

function combineConsonants(keys: string[]) {
  return keys.reduce<string[]>((prev, curr) => {
    if (prev.length === 0) {
      return [curr];
    }

    const last = prev[prev.length - 1];

    if (last.startsWith("c_") && curr.startsWith("x_")) {
      return [...prev.slice(0, -1), `c_${last.slice(2)}${curr.slice(2)}`];
    } else {
      return [...prev, curr];
    }
  }, []);
}

function combineVowels(keys: string[]) {
  return keys.reduce<string[]>((prev, curr) => {
    if (prev.length === 0) {
      return [curr];
    }

    const last = prev[prev.length - 1];

    if (last.startsWith("c_") && curr.startsWith("v_")) {
      return [
        ...prev.slice(0, -1),
        `v_${curr.slice(2).replace(/c/, last.slice(2))}`,
      ];
    } else {
      return [...prev, curr];
    }
  }, []);
}

function combineEndings(keys: string[]) {
  return keys.reduce<string[]>((prev, curr) => {
    if (prev.length === 0) {
      return [curr];
    }

    const last = prev[prev.length - 1];

    if (last.startsWith("v_") && curr.startsWith("c_")) {
      return [...prev.slice(0, -1), `${last}${curr.slice(2)}`];
    } else {
      return [...prev, curr];
    }
  }, []);
}

function combineTones(keys: string[]) {
  return keys.reduce<string[]>((prev, curr) => {
    if (prev.length === 0) {
      return [curr];
    }

    const last = prev[prev.length - 1];

    if (last.startsWith("v_") && curr.startsWith("t_")) {
      return [
        ...prev.slice(0, -1),
        `v_${last.slice(2).replace(/t/, curr.slice(2))}`,
      ];
    } else {
      return [...prev, curr];
    }
  }, []);
}

function removeMarkers(keys: string[]) {
  return keys.map((curr) => {
    if (curr.startsWith("v_")) {
      return curr.slice(2).replace(/t/, "");
    } else if (curr.startsWith("c_")) {
      return curr.slice(2);
    } else {
      return curr;
    }
  });
}
