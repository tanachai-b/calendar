function getChildPositions(parent: HTMLElement) {
  const childHeights = (Array.from(parent.childNodes) as HTMLElement[]).map(
    (v) => v.clientHeight
  );
  const childPositions = childHeights.reduce(
    (prev, curr) => [...prev, prev[prev.length - 1] + curr],
    [0]
  );

  return childPositions;
}

export function getScrollIndex(
  elementWithChildren: HTMLElement,
  scrollElement: HTMLElement
) {
  const childPositions = getChildPositions(elementWithChildren);
  const scrollIndex = childPositions.findIndex(
    (v) => v > scrollElement.scrollTop + scrollElement.clientHeight / 2
  );

  return scrollIndex;
}

export function scrollToIndex(
  elementWithChildren: HTMLElement,
  scrollElement: HTMLElement,
  index: number
) {
  const childPositions = getChildPositions(elementWithChildren);
  const scrollPosition = childPositions[index];

  scrollElement.scrollTo({
    top: scrollPosition - scrollElement.clientHeight / 2,
  });
}
