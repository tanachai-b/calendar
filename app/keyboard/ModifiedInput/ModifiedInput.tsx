import { useState } from "react";

import { TextInput } from "../TextInput/TextInput";
import { consonantMappings } from "./keyMappings";
import {
  applyDoubleStroke,
  combineConsonants,
  combineEndings,
  combineTones,
  combineVowels,
  getNextType,
  removeMarkers,
} from "./linguisticUtils";

export function ModifiedInput({
  onChanged,
  onShiftChanged,
}: {
  onChanged?: (nextType: "consonant" | "vowel") => void;
  onShiftChanged?: (isDown: boolean) => void;
}) {
  const [composing, setComposing] = useState<{
    isNew?: boolean;
    start: number;
    keys: string[];
    text: string;
  }>();

  function handleTextChanged(
    html: string,
    oldSelection: number,
    newSelection: number,
    key: string
  ) {
    const composingKeys = getComposingKeys(
      oldSelection,
      newSelection,
      key,
      composing
    );
    const composingText = getComposingText(composingKeys);
    setComposing(composingText);

    onChanged?.(getNextType(composingText?.keys ?? []));

    if (composingText) {
      const newHtml = replaceAndFormatText(
        html,
        composingText.text,
        composingText.start,
        newSelection
      );

      const selectDiff = newSelection - oldSelection;

      const composingDiff = composingText.isNew
        ? composingText.text.length
        : composingText.text.length - (composing?.text.length ?? 0);

      const selectionOffset = composingDiff - selectDiff;

      return { newHtml, selectionOffset };
    } else {
      return;
    }
  }

  return (
    <TextInput onChanged={handleTextChanged} onShiftChanged={onShiftChanged} />
  );
}

function getComposingKeys(
  oldSelection: number,
  newSelection: number,
  key: string,
  composing?: { start: number; keys: string[]; text: string }
) {
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

function replaceAndFormatText(
  html: string,
  replace: string,
  start: number,
  end: number
) {
  const before = html.slice(0, start);
  const after = html.slice(end);

  return before + formatText(replace) + after;
}

function formatText(text: string) {
  return `<span style='color:#ffc000'>${text}</span>`;
}
