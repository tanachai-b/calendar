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
    leftTop?: string;
    leftBottom?: string;
    rightTop?: string;
    rightBottom?: string;
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
          <Key center="Backspace" width={2} className="rounded-tr-xl" />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key center="Tab" width={1.5} />

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
          <Key center="Caps" width={1.75} />

          <Key {...scheme["a"]} />
          <Key {...scheme["s"]} />
          <Key {...scheme["d"]} />
          <Key {...scheme["f"]} isTactile={true} />
          <Key {...scheme["g"]} />
          <Key {...scheme["h"]} />
          <Key {...scheme["j"]} isTactile={true} />
          <Key {...scheme["k"]} />
          <Key {...scheme["l"]} />
          <Key {...scheme[";"]} />

          <Key {...scheme["'"]} />
          <Key center="Enter" width={2.25} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key center="Shift" width={2.25} />

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

          <Key center="Shift" width={2.75} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key center="Ctrl" width={1.25} className="rounded-bl-xl" />
          <Key center="Win" width={1.25} />
          <Key center="Alt" width={1.25} />

          <Key center="Space" width={6.25} />

          <Key center="Alt" width={1.25} />
          <Key center="Win" width={1.25} />
          <Key center="Menu" width={1.25} />
          <Key center="Ctrl" width={1.25} className="rounded-br-xl" />
        </div>
      </div>
    </div>
  );
}
