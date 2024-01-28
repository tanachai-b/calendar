"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useWatchDrag() {
  const ref = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [value, setValue] = useState<number>(360 * 60 * 12 * Math.random());

  function handleMouseDown() {
    setIsMouseDown(true);
    ref.current?.requestPointerLock();
  }

  function handleDocumentMouseMove({ movementX, movementY }: MouseEvent): void {
    if (!isMouseDown) return;
    console.log("isMouseDown", isMouseDown);
    setValue(
      (value) =>
        value +
        Math.abs(movementX + movementY) ** 2 * Math.sign(movementX + movementY)
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
  }, [document, isMouseDown]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isMouseDown) return;
      const val =
        new Date().getHours() * 360 * 60 +
        new Date().getMinutes() * 360 +
        (new Date().getSeconds() * 360) / 60 +
        (new Date().getMilliseconds() * 360) / 60 / 1000;
      setValue(val);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isMouseDown]);

  return { ref, value, handleMouseDown };
}
