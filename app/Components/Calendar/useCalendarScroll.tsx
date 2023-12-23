import { Black_Han_Sans } from "next/font/google";
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

  const [blockHandler, setBlockHandler] = useState<boolean>(false);

  useEffect(() => {
    if (initialized) return;
    initialized = true;

    if (!scrollRef.current) return;
    (scrollRef.current as HTMLElement).scrollTo({ top: 1 });

    checkContent();
  }, []);

  useEffect(() => checkContent(), [data]);

  useEffect(() => {
    if (!scrollRef.current) return;
    (scrollRef.current as HTMLElement).addEventListener("scroll", handleScroll);
    (scrollRef.current as HTMLElement).addEventListener(
      "scrollend",
      handleScrollEnd
    );

    return () => {
      if (!scrollRef.current) return;
      (scrollRef.current as HTMLElement).removeEventListener(
        "scroll",
        handleScroll
      );
      (scrollRef.current as HTMLElement).removeEventListener(
        "scrollend",
        handleScrollEnd
      );
    };
  }, [handleScroll, handleScrollEnd]);

  function handleScroll() {
    if (blockHandler) return;

    if (!scrollRef.current) return;
    const scroll = scrollRef.current as HTMLElement;

    if (scroll.scrollTop === 0) scroll.scrollTo({ top: 1 });
    if (scroll.scrollTop + scroll.clientHeight === scroll.scrollHeight)
      scroll.scrollTo({ top: scroll.scrollHeight - scroll.clientHeight - 50 });

    checkContent();
  }

  function handleScrollEnd() {
    if (blockHandler) {
      setBlockHandler(false);
      checkContent();
    }
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

  function scrollTo(monthRef: React.MutableRefObject<null>) {
    if (!monthRef.current) return;

    setBlockHandler(true);
    (monthRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }

  return { scrollRef, scrollTo };
}
