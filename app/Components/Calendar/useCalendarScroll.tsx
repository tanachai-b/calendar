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
    const scroll = scrollRef.current as HTMLElement;

    scroll.addEventListener("scroll", handleScroll);
    scroll.addEventListener("scrollend", handleScrollEnd);

    return () => {
      if (!scrollRef.current) return;
      scroll.removeEventListener("scroll", handleScroll);
      scroll.removeEventListener("scrollend", handleScrollEnd);
    };
  }, [handleScroll, handleScrollEnd]);

  function handleScroll() {
    if (!scrollRef.current) return;
    const scroll = scrollRef.current as HTMLElement;

    if (scroll.scrollTop === 0) scroll.scrollTo({ top: 1 });
    if (scroll.scrollTop + scroll.clientHeight === scroll.scrollHeight)
      scroll.scrollTo({ top: scroll.scrollHeight - scroll.clientHeight - 50 });

    if (blockHandler) return;

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

  function scrollTo(ref: React.MutableRefObject<null>) {
    if (!ref.current) return;

    setBlockHandler(true);
    (ref.current as HTMLElement).scrollIntoView();
  }

  function resetScroll() {
    if (!scrollRef.current) return;

    setBlockHandler(true);
    (scrollRef.current as HTMLElement).scrollTo({ top: 1 });
  }

  return { scrollRef, scrollTo, resetScroll };
}
