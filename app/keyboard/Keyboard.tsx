import { Key } from "./Key";
import { qwertyScheme } from "./schemes";

type KeyboardKey =
  | "`"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0"
  | "-"
  | "="
  | "q"
  | "w"
  | "e"
  | "r"
  | "t"
  | "y"
  | "u"
  | "i"
  | "o"
  | "p"
  | "["
  | "]"
  | "\\"
  | "a"
  | "s"
  | "d"
  | "f"
  | "g"
  | "h"
  | "j"
  | "k"
  | "l"
  | ";"
  | "'"
  | "z"
  | "x"
  | "c"
  | "v"
  | "b"
  | "n"
  | "m"
  | ","
  | "."
  | "/";

export type KeyboardScheme = {
  [Key in KeyboardKey]?: {
    top?: string;
    bottom?: string;
    topRight?: string;
    bottomRight?: string;
  };
};

export function Keyboard({
  scheme = qwertyScheme,
}: {
  scheme?: KeyboardScheme;
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex flex-col divide-y divide-border">
        <div className="flex flex-row divide-x divide-border">
          <Key {...scheme["`"]} className="rounded-tl-xl" />

          <Key {...scheme["1"]} />
          <Key {...scheme["2"]} />
          <Key {...scheme["3"]} />
          <Key {...scheme["4"]} />
          <Key {...scheme["5"]} />
          <Key {...scheme["6"]} />
          <Key {...scheme["7"]} />
          <Key {...scheme["8"]} />
          <Key {...scheme["9"]} />
          <Key {...scheme["0"]} />

          <Key {...scheme["-"]} />
          <Key {...scheme["="]} />
          <Key label="Backspace" width={2} className="rounded-tr-xl" />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key label="Tab" width={1.5} />

          <Key {...scheme["q"]} />
          <Key {...scheme["w"]} />
          <Key {...scheme["e"]} />
          <Key {...scheme["r"]} />
          <Key {...scheme["t"]} />
          <Key {...scheme["y"]} />
          <Key {...scheme["u"]} />
          <Key {...scheme["i"]} />
          <Key {...scheme["o"]} />
          <Key {...scheme["p"]} />

          <Key {...scheme["["]} />
          <Key {...scheme["]"]} />
          <Key {...scheme["\\"]} width={1.5} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key label="Caps" width={1.75} />

          <Key {...scheme["a"]} />
          <Key {...scheme["s"]} />
          <Key {...scheme["d"]} />
          <Key {...scheme["f"]} tactile />
          <Key {...scheme["g"]} />
          <Key {...scheme["h"]} />
          <Key {...scheme["j"]} tactile />
          <Key {...scheme["k"]} />
          <Key {...scheme["l"]} />
          <Key {...scheme[";"]} />

          <Key {...scheme["'"]} />
          <Key label="Enter" width={2.25} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key label="Shift" width={2.25} />

          <Key {...scheme["z"]} />
          <Key {...scheme["x"]} />
          <Key {...scheme["c"]} />
          <Key {...scheme["v"]} />
          <Key {...scheme["b"]} />
          <Key {...scheme["n"]} />
          <Key {...scheme["m"]} />
          <Key {...scheme[","]} />
          <Key {...scheme["."]} />
          <Key {...scheme["/"]} />

          <Key label="Shift" width={2.75} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key label="Ctrl" width={1.25} className="rounded-bl-xl" />
          <Key label="Win" width={1.25} />
          <Key label="Alt" width={1.25} />

          <Key label="" width={6.25} />

          <Key label="Alt" width={1.25} />
          <Key label="Win" width={1.25} />
          <Key label="Menu" width={1.25} />
          <Key label="Ctrl" width={1.25} className="rounded-br-xl" />
        </div>
      </div>
    </div>
  );
}
