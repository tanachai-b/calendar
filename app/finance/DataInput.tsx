import cx from "classnames";
import {
  HTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
  useState,
} from "react";

import { Card } from "./components/Card";

import "./page.css";

export function DataInputCard(props: HTMLAttributes<HTMLDivElement>) {
  const ref1 = useRef<HTMLTextAreaElement>(null);
  const ref2 = useRef<HTMLTextAreaElement>(null);

  const [excel, setExcel] = useState<string>("");
  const [json, setJson] = useState<string>("");

  function handleExcelChange(excel: string): void {
    setExcel(excel);
    setJson(toJson(excel));
  }

  function handleJsonChange(json: string): void {
    setJson(json);
    setExcel(toExcel(json));
  }

  return (
    <Card
      {...props}
      className={cx("flex", "flex-col", "gap-x10", "p-x10", props.className)}
    >
      <TextArea
        ref={ref1}
        className={cx("grow")}
        value={excel}
        onChange={(ev) => handleExcelChange(ev.target.value)}
      />

      <TextArea
        ref={ref2}
        className={cx("grow")}
        value={json}
        onChange={(ev) => handleJsonChange(ev.target.value)}
      />
    </Card>
  );
}

const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea(props, ref) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={cx(
        "outline-none",
        "resize-none",

        "rounded-x5",
        "bg-[#00000000]",
        "focus:bg-[#00000020]",
        "p-x5",

        "dark-scroll-bar",

        props.className
      )}
    />
  );
});

function toJson(excel: string) {
  const lines = excel.trim().split("\n");

  const headers = lines[0].split("\t");
  const rows = lines.slice(1);

  const output = rows.map((line) => {
    const cells = line.split("\t");
    return cells.reduce((p, c, i) => ({ ...p, [headers[i]]: c }), {});
  });

  return JSON.stringify(output, null, 2);
}

function toExcel(json: string) {
  const objects: object[] = JSON.parse(json);

  const headers = Array.from(
    new Set(
      objects.reduce<string[]>(
        (keys, object) => [...keys, ...Object.keys(object)],
        []
      )
    )
  );

  const rows = [
    headers.join("\t"),
    ...objects.map((object) =>
      headers.map((header) => object[header as keyof object]).join("\t")
    ),
  ].join("\n");

  return rows;
}
