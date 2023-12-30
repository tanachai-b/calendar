import { Key } from "./Key";
import { KeyboardLayout, qwertyLayout } from "./keyboardLayouts";

export function Keyboard({
  layout = qwertyLayout,
}: {
  layout?: KeyboardLayout;
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex flex-col divide-y divide-border">
        <div className="flex flex-row divide-x divide-border">
          <Key {...(layout["`"] ?? {})} className="rounded-tl-xl" />

          <Key {...(layout["1"] ?? {})} />
          <Key {...(layout["2"] ?? {})} />
          <Key {...(layout["3"] ?? {})} />
          <Key {...(layout["4"] ?? {})} />
          <Key {...(layout["5"] ?? {})} />
          <Key {...(layout["6"] ?? {})} />
          <Key {...(layout["7"] ?? {})} />
          <Key {...(layout["8"] ?? {})} />
          <Key {...(layout["9"] ?? {})} />
          <Key {...(layout["0"] ?? {})} />

          <Key {...(layout["-"] ?? {})} />
          <Key {...(layout["="] ?? {})} />
          <Key label="Backspace" width={2} className="rounded-tr-xl" />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key label="Tab" width={1.5} />

          <Key {...(layout["q"] ?? {})} />
          <Key {...(layout["w"] ?? {})} />
          <Key {...(layout["e"] ?? {})} />
          <Key {...(layout["r"] ?? {})} />
          <Key {...(layout["t"] ?? {})} />
          <Key {...(layout["y"] ?? {})} />
          <Key {...(layout["u"] ?? {})} />
          <Key {...(layout["i"] ?? {})} />
          <Key {...(layout["o"] ?? {})} />
          <Key {...(layout["p"] ?? {})} />

          <Key {...(layout["["] ?? {})} />
          <Key {...(layout["]"] ?? {})} />
          <Key {...(layout["\\"] ?? {})} width={1.5} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key label="Caps" width={1.75} />

          <Key {...(layout["a"] ?? {})} />
          <Key {...(layout["s"] ?? {})} />
          <Key {...(layout["d"] ?? {})} />
          <Key {...(layout["f"] ?? {})} tactile />
          <Key {...(layout["g"] ?? {})} />
          <Key {...(layout["h"] ?? {})} />
          <Key {...(layout["j"] ?? {})} tactile />
          <Key {...(layout["k"] ?? {})} />
          <Key {...(layout["l"] ?? {})} />
          <Key {...(layout[";"] ?? {})} />

          <Key {...(layout["'"] ?? {})} />
          <Key label="Enter" width={2.25} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key label="Shift" width={2.25} />

          <Key {...(layout["z"] ?? {})} />
          <Key {...(layout["x"] ?? {})} />
          <Key {...(layout["c"] ?? {})} />
          <Key {...(layout["v"] ?? {})} />
          <Key {...(layout["b"] ?? {})} />
          <Key {...(layout["n"] ?? {})} />
          <Key {...(layout["m"] ?? {})} />
          <Key {...(layout[","] ?? {})} />
          <Key {...(layout["."] ?? {})} />
          <Key {...(layout["/"] ?? {})} />

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
