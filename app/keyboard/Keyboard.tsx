import { Key } from "./Key";
import { qwertyScheme } from "./schemes";

export function Keyboard({
  scheme = qwertyScheme,
}: {
  scheme?: {
    leftTop?: string;
    leftBottom?: string;
    rightTop?: string;
    rightBottom?: string;
  }[];
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex flex-col divide-y divide-border">
        <div className="flex flex-row divide-x divide-border">
          <Key {...scheme[0]} className="rounded-tl-xl" />

          <Key {...scheme[1]} />
          <Key {...scheme[2]} />
          <Key {...scheme[3]} />
          <Key {...scheme[4]} />
          <Key {...scheme[5]} />
          <Key {...scheme[6]} />
          <Key {...scheme[7]} />
          <Key {...scheme[8]} />
          <Key {...scheme[9]} />
          <Key {...scheme[10]} />

          <Key {...scheme[11]} />
          <Key {...scheme[12]} />
          <Key center="Backspace" width={2} className="rounded-tr-xl" />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key center="Tab" width={1.5} />

          <Key {...scheme[13]} />
          <Key {...scheme[14]} />
          <Key {...scheme[15]} />
          <Key {...scheme[16]} />
          <Key {...scheme[17]} />
          <Key {...scheme[18]} />
          <Key {...scheme[19]} />
          <Key {...scheme[20]} />
          <Key {...scheme[21]} />
          <Key {...scheme[22]} />

          <Key {...scheme[23]} />
          <Key {...scheme[24]} />
          <Key {...scheme[25]} width={1.5} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key center="Caps" width={1.75} />

          <Key {...scheme[26]} />
          <Key {...scheme[27]} />
          <Key {...scheme[28]} />
          <Key {...scheme[29]} isTactile={true} />
          <Key {...scheme[30]} />
          <Key {...scheme[31]} />
          <Key {...scheme[32]} isTactile={true} />
          <Key {...scheme[33]} />
          <Key {...scheme[34]} />
          <Key {...scheme[35]} />

          <Key {...scheme[36]} />
          <Key center="Enter" width={2.25} />
        </div>

        <div className="flex flex-row divide-x divide-border">
          <Key center="Shift" width={2.25} />

          <Key {...scheme[37]} />
          <Key {...scheme[38]} />
          <Key {...scheme[39]} />
          <Key {...scheme[40]} />
          <Key {...scheme[41]} />
          <Key {...scheme[42]} />
          <Key {...scheme[43]} />
          <Key {...scheme[44]} />
          <Key {...scheme[45]} />
          <Key {...scheme[46]} />

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
