import { MutableRefObject, useMemo } from "react";

export function AutoSizeTextArea({
  textLinesRef,
  text,
  onChange,
}: {
  textLinesRef: MutableRefObject<null>;
  text: string;
  onChange: (value: string) => void;
}) {
  const lines = useMemo(() => text.split("\n"), [text]);

  return (
    <div className="relative">
      <textarea
        className="absolute w-full h-full outline-none px-2.5 text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none overflow-hidden"
        value={text}
        onChange={(e) => onChange(e.target.value)}
      />

      <div ref={textLinesRef} className="flex flex-col invisible">
        {lines.map((line, index) => (
          <div key={index} className="px-2.5 whitespace-pre-wrap">
            {line}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
