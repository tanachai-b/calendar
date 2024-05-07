"use client";

import { useEffect, useRef, useState } from "react";

export function useClockDrag() {
  const ref = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  function handleMouseDown() {
    setIsMouseDown(true);
    ref.current?.requestPointerLock();
  }

  function handleDocumentMouseMove({ movementX, movementY }: MouseEvent): void {
    if (!isMouseDown) return;
    setValue(
      (value) =>
        value +
        1000 *
          Math.abs(movementX + movementY) ** 2 *
          Math.sign(movementX + movementY)
    );
  }

  function handleDocumentMouseUp() {
    setIsMouseDown(false);
    document.exitPointerLock();
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, [isMouseDown]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isMouseDown) return;
      setValue(new Date().getTime());
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isMouseDown]);

  return { ref, value, handleMouseDown };
}
