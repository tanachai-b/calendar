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

  const [table, setTable] = useState<string[][]>([]);

  function handleExcelChange(excel: string): void {
    setExcel(excel);
    setJson(toJson(excel));
    setTable(toTable(excel));
  }

  function handleJsonChange(json: string): void {
    setJson(json);
    setExcel(toExcel(json));
  }

  return (
    <Card
      {...props}
      className={cx("p-x10", "flex", "flex-row", "gap-x10", props.className)}
    >
      <div className={cx("flex-1", "flex", "flex-col", "gap-x10")}>
        <TextArea
          ref={ref1}
          className={cx("flex-1")}
          value={excel}
          onChange={(ev) => handleExcelChange(ev.target.value)}
        />

        <TextArea
          ref={ref2}
          className={cx("flex-1")}
          value={json}
          onChange={(ev) => handleJsonChange(ev.target.value)}
        />
      </div>

      <div className={cx("flex-1", "overflow-auto", "dark-scroll-bar")}>
        <table style={{ fontFamily: "Calibri", fontSize: 15 }}>
          <tbody>
            {table.map((row, index) => (
              <tr
                key={index}
                style={{
                  ...(index === 0
                    ? {
                        fontWeight: "bold",
                        background: "#f0f0f0",
                        textAlign: "center",
                      }
                    : {}),
                  color: "#ffffff",
                  background: "#202020",
                  ...(index > 0
                    ? parseInt(row[5]) < 0
                      ? { color: "#ff0080" }
                      : { color: "#80ff00" }
                    : {}),
                }}
              >
                {row.map((cell, index) => (
                  <td
                    key={index}
                    style={
                      {
                        // border: "thin solid #e0e0e0",
                      }
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

  const json = rows.map((line) => {
    const cells = line.split("\t");
    return cells.reduce((p, c, i) => ({ ...p, [headers[i]]: c }), {});
  });

  return JSON.stringify(json, null, 2);
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

  const excel = [
    headers.join("\t"),
    ...objects.map((object) =>
      headers.map((header) => object[header as keyof object]).join("\t")
    ),
  ].join("\n");

  return excel;
}

function toTable(excel: string) {
  const lines = excel.trim().split("\n");

  const table = lines.map((line) => line.split("\t"));

  return table;
}
