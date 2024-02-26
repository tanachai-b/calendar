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
      <div className={cx("w-x500", "flex", "flex-col", "gap-x10")}>
        <TextArea
          ref={ref1}
          className={cx("flex-1")}
          value={excel}
          onChange={(ev) => handleExcelChange(ev.target.value)}
          placeholder="Paste text copied from Excel here..."
        />

        <TextArea
          ref={ref2}
          className={cx("flex-1")}
          value={json}
          onChange={(ev) => handleJsonChange(ev.target.value)}
          placeholder="JSON output will be displayed here..."
        />
      </div>

      <div className={cx("flex-1", "overflow-auto", "dark-scroll-bar")}>
        <table style={{ position: "relative" }}>
          <thead>
            {(table[0] ?? []).map((cell, index) => (
              <th
                key={index}
                style={{
                  top: 0,
                  position: "sticky",

                  whiteSpace: "pre",
                  padding: "5px",

                  background: "#ffffff",
                  color: "#808080",

                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                {cell}
              </th>
            ))}
          </thead>

          <tbody>
            {table.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td
                    key={index}
                    style={{
                      whiteSpace: "pre",
                      padding: "5px",
                      verticalAlign: "text-top",

                      ...(index === 7 ? { whiteSpace: "wrap" } : {}),
                    }}
                  >
                    <div
                      style={{
                        borderRadius: "5px",
                        // textAlign: "center",

                        ...(index === 2
                          ? row[2] === "Expense"
                            ? { color: "#ffffff", background: "#e00000" }
                            : row[2] === "Income"
                            ? { color: "#000000", background: "#00c080" }
                            : { color: "#000000", background: "#ffe000" }
                          : { background: "#ffffff", color: "#000000" }),
                      }}
                    >
                      {cell}
                    </div>
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
