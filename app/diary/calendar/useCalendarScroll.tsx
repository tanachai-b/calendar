import { useEffect, useRef, useState } from "react";

export function useCalendarScroll<T>(
  data: T,
  onRequestPrevious: () => void,
  onRemovePrevious: () => void,
  onRequestNext: () => void,
  onRemoveNext: () => void,
  onScrollEnd?: (scrollTop: number) => void
) {
  const scrollRef = useRef(null);

  let initialized = false;

  const [blockCheckContent, setBlockCheckContent] = useState<boolean>(false);
  const [isSystemScroll, setIsSystemScroll] = useState<boolean>(false);

  useEffect(() => {
    if (initialized) return;
    initialized = true;

    if (!scrollRef.current) return;
    (scrollRef.current as HTMLElement).scrollTo({ top: 1 });
  }, []);

  useEffect(() => checkContent(), [data]);

  useEffect(() => {
    if (!scrollRef.current) return;
    const scroll = scrollRef.current as HTMLElement;

    scroll.addEventListener("scroll", handleScroll);
    scroll.addEventListener("scrollend", handleScrollEnd);

    return () => {
      if (!scrollRef.current) return;
      scroll.removeEventListener("scroll", handleScroll);
      scroll.removeEventListener("scrollend", handleScrollEnd);
    };
  }, [handleScroll]);

  function handleScroll() {
    if (!scrollRef.current) return;
    const scroll = scrollRef.current as HTMLElement;

    if (scroll.scrollTop === 0) scroll.scrollTo({ top: 1 });
    if (scroll.scrollTop + scroll.clientHeight === scroll.scrollHeight)
      scroll.scrollTo({ top: scroll.scrollHeight - scroll.clientHeight - 90 });

    checkContent();
  }

  function handleScrollEnd() {
    if (isSystemScroll) return;

    if (!scrollRef.current) return;
    const scroll = scrollRef.current as HTMLElement;

    onScrollEnd?.(scroll.scrollTop);
  }

  function checkContent() {
    if (blockCheckContent) return;

    if (!scrollRef.current) return;
    const scroll = scrollRef.current as HTMLElement;

    const contentBottom =
      scroll.scrollHeight -
      scroll.clientHeight -
      (scroll.scrollTop + scroll.clientHeight);

    if (scroll.scrollTop < scroll.clientHeight) onRequestPrevious();
    if (contentBottom < 0) onRequestNext();

    if (scroll.scrollTop > scroll.clientHeight * 2) onRemovePrevious();
    if (contentBottom > scroll.clientHeight) onRemoveNext();
  }

  async function resetScroll() {
    if (!scrollRef.current) return;

    setIsSystemScroll(true);
    setTimeout(() => setIsSystemScroll(false), 20);

    await new Promise((resolve) => setTimeout(resolve, 10));
    (scrollRef.current as HTMLElement).scrollTo({ top: 1 });
  }

  return {
    scrollRef,
    setBlockCheckContent,
    resetScroll,
  };
}
