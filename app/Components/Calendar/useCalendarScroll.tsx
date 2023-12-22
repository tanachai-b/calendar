import { useEffect, useRef, useState } from "react";

export function useCalendarScroll(
  onRequestPrevious: () => void,
  onRequestNext: () => void
) {
  const scrollRef = useRef(null);

  let intialized = false;

  const [disableScrollHandler, setDisableScrollHandler] =
    useState<boolean>(false);

  useEffect(() => {
    if (!scrollRef.current) return;
    const scrollCurrent = scrollRef.current as HTMLElement;
    scrollCurrent.addEventListener("scroll", handleScroll);
    scrollCurrent.addEventListener("scrollend", handleScrollEnd);

    if (!intialized) {
      intialized = true;
      (scrollRef.current as HTMLElement).scrollTo({
        top: (scrollRef.current as HTMLElement).clientHeight,
        behavior: "instant",
      });
    }

    return () => {
      if (!scrollRef.current) return;
      const scrollCurrent = scrollRef.current as HTMLElement;
      scrollCurrent.removeEventListener("scroll", handleScroll);
      scrollCurrent.removeEventListener("scrollend", handleScrollEnd);
    };
  }, []);

  function handleScroll() {
    if (disableScrollHandler) return;
    if (!scrollRef.current) return;

    const { childCount, scrollTopChild, scrollBottomChild, overscroll } =
      getScrollInfo(scrollRef.current);

    if (scrollTopChild === 0) {
      (scrollRef.current as HTMLElement).scrollTo({
        top: (scrollRef.current as HTMLElement).clientHeight,
        behavior: "instant",
      });
    } else if (scrollTopChild === childCount - 1) {
      (scrollRef.current as HTMLElement).scrollBy({
        top: -overscroll,
        behavior: "instant",
      });
    }

    if (scrollTopChild <= 2) onRequestPrevious();
    if (scrollBottomChild >= childCount - 1) onRequestNext();
  }

  function handleScrollEnd() {
    if (disableScrollHandler) {
      setDisableScrollHandler(false);

      if (!scrollRef.current) return;

      (scrollRef.current as HTMLElement).scrollBy({
        top: 1,
        behavior: "instant",
      });
    }
  }

  function getScrollInfo(target: HTMLElement) {
    const superChildren = Array.from(target.children);

    function spread(superChildren: Element[]) {
      return superChildren.reduce<Element[]>(
        (prev, curr) => [...prev, ...Array.from(curr.children)],
        []
      );
    }

    const children = [
      superChildren[0],
      ...spread(superChildren.slice(1, -1)),
      superChildren[superChildren.length - 1],
    ];
    const childHeights = children.map(({ clientHeight }) => clientHeight);
    const childPositions = childHeights
      .reduce((prev, curr, index) => [...prev, prev[index] + curr], [0])
      .slice(0, -1);

    const scrollTop = target.scrollTop + childHeights[1];
    const scrollBottom = target.scrollTop + target.clientHeight;

    const childCount = children.length;
    const scrollTopChild = childPositions.findLastIndex(
      (value) => scrollTop >= value
    );
    const scrollBottomChild = childPositions.findLastIndex(
      (value) => scrollBottom >= value
    );

    const overscroll = scrollBottom - childPositions[childPositions.length - 1];

    return { childCount, scrollTopChild, scrollBottomChild, overscroll };
  }

  return { scrollRef, setDisableScrollHandler };
}
