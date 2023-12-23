import { useEffect, useRef, useState } from "react";

export function useCalendarScroll(
  data: {
    year: number;
    month: number;
    days: { day: number; keypointCount: number }[];
  }[],
  onRequestPrevious: () => void,
  onRemovePrevious: () => void,
  onRequestNext: () => void,
  onRemoveNext: () => void
) {
  const scrollRef = useRef(null);

  let initialized = false;

  useEffect(() => {
    if (initialized) return;
    initialized = true;

    if (!scrollRef.current) return;
    (scrollRef.current as HTMLElement).scrollTo({ top: 10 });

    checkContent();
  }, []);

  useEffect(() => checkContent(), [data]);

  useEffect(() => {
    if (!scrollRef.current) return;
    (scrollRef.current as HTMLElement).addEventListener("scroll", handleScroll);

    return () => {
      if (!scrollRef.current) return;
      (scrollRef.current as HTMLElement).removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  function handleScroll() {
    if (!scrollRef.current) return;
    const scroll = scrollRef.current as HTMLElement;

    if (scroll.scrollTop === 0) scroll.scrollTo({ top: 10 });
    if (scroll.scrollTop + scroll.clientHeight === scroll.scrollHeight)
      scroll.scrollTo({ top: scroll.scrollHeight - scroll.clientHeight - 10 });

    checkContent();
  }

  function checkContent() {
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

  return { scrollRef };
}
