import { RefObject } from "react";

export function isDayGotMergedToPrevious(
  baseline: string[],
  resplittedDays: string[]
) {
  return (
    (baseline.length === 3 && resplittedDays.length === 2) ||
    (baseline.length === 2 && resplittedDays.length === 1)
  );
}

export function isDayGotSplitted(baseline: string[], resplittedDays: string[]) {
  return (
    (baseline.length === 3 && resplittedDays.length === 4) ||
    (baseline.length === 2 && resplittedDays.length === 3) ||
    (baseline.length === 1 && resplittedDays.length === 2)
  );
}

export function setCursorOnPrevTextarea(
  textareaRefs: RefObject<HTMLTextAreaElement>[],
  index: number,
  setCursor: (props: { index: number; selection: number }) => void
) {
  if (textareaRefs[index - 1].current && textareaRefs[index].current) {
    const prevTextarea = textareaRefs[index - 1].current as HTMLTextAreaElement;
    const currTextarea = textareaRefs[index].current as HTMLTextAreaElement;

    const newSelection =
      prevTextarea.textLength + currTextarea.selectionStart + 1;

    setCursor({ index: index - 1, selection: newSelection });
  }
}

export async function setCursorOnNewTextarea(
  textareaRefs: RefObject<HTMLTextAreaElement>[],
  index: number,
  setCursor: (props: { index: number; selection: number }) => void
) {
  if (textareaRefs[index].current) {
    const currTextarea = textareaRefs[index].current as HTMLTextAreaElement;

    const oldSelection = currTextarea.selectionStart;

    await new Promise((resolve) => setTimeout(resolve, 10));

    const newSelection = oldSelection - currTextarea.textLength - 1;

    setCursor({ index: index + 1, selection: newSelection });
  }
}
