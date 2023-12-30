export function getSelectionStart(element: HTMLElement): number {
  const selection = window.getSelection();
  if (!selection) return -1;
  const range = selection.getRangeAt(0);

  const tempRange = document.createRange();
  tempRange.setStart(element, 0);
  tempRange.setEnd(range.startContainer, range.startOffset);

  return tempRange.toString().length;
}

export function getSelectionEnd(element: HTMLElement): number {
  const selection = window.getSelection();
  if (!selection) return -1;
  const range = selection.getRangeAt(0);

  const tempRange = document.createRange();
  tempRange.setStart(element, 0);
  tempRange.setEnd(range.endContainer, range.endOffset);

  return tempRange.toString().length;
}

function getFlatChildNodes(element: HTMLElement): ChildNode[] {
  return Array.from(element.childNodes).reduce<ChildNode[]>((prev, curr) => {
    if (curr.childNodes.length === 0) {
      return [...prev, curr];
    } else {
      return [...prev, ...getFlatChildNodes(curr as HTMLElement)];
    }
  }, []);
}

function getChildAtPosition(element: HTMLElement, position: number) {
  const flatChildNodes = getFlatChildNodes(element);

  const accumTextLengths = flatChildNodes.reduce(
    (prev, curr) => [
      ...prev,
      prev[prev.length - 1] + (curr.textContent?.length ?? 0),
    ],
    [0]
  );
  const childIndex = accumTextLengths.findLastIndex((v) => v < position);

  return {
    childNode: flatChildNodes[childIndex],
    offset: position - accumTextLengths[childIndex],
  };
}

export function setSelection(element: HTMLElement, start: number, end: number) {
  const { childNode: startChildNode, offset: startOffset } = getChildAtPosition(
    element,
    start
  );
  const { childNode: endChildNode, offset: endOffset } = getChildAtPosition(
    element,
    end
  );

  if (!startChildNode) return;
  if (!endChildNode) return;

  const range = document.createRange();
  range.setStart(startChildNode, startOffset);
  range.setEnd(endChildNode, endOffset);

  const selection = window.getSelection();
  if (!selection) return;

  selection.removeAllRanges();
  selection.addRange(range);
}

export function setSelectionToEnd(element: HTMLElement) {
  const range = document.createRange();
  range.setStart(element, 1);
  range.collapse(true);

  const selection = window.getSelection();
  if (!selection) return;

  selection.removeAllRanges();
  selection.addRange(range);
}
