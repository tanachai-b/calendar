import { useEffect, useRef, useState } from "react";

export function useCalendarScroll<T>(
  data: T,
  onRequestPrevious: () => void,
  onRemovePrevious: () => void,
  onRequestNext: () => void,
  onRemoveNext: () => void
) {
  const scrollRef = useRef(null);

  let initialized = false;

  const [blockCheckContent, setBlockCheckContent] = useState<boolean>(false);

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

    return () => {
      if (!scrollRef.current) return;
      scroll.removeEventListener("scroll", handleScroll);
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

  function resetScroll() {
    if (!scrollRef.current) return;
    (scrollRef.current as HTMLElement).scrollTo({ top: 1 });
  }

  return {
    scrollRef,
    setBlockCheckContent,
    resetScroll,
  };
}
