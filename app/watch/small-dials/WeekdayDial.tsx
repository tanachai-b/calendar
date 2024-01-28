"use client";

import cx from "classnames";

export function WeekdayDial({ value }: { value: number }) {
  const angle = -((new Date().getDay() + value / 360 / 60 / 24) / 7) * 360;

  return (
    <g transform={`translate(${125}, ${0})`}>
      <circle r={80} fill="url(#radial1)" />
      <circle r={78} fill="url(#radial2)" />
      <circle r={50} fill="url(#radial1)" />
      <circle r={48} fill="#101010" />

      {Array.from({ length: 7 }).map((v, i) => (
        <line
          key={i}
          x1={0}
          y1={5}
          x2={0}
          y2={30 - 5}
          strokeWidth={i % 7 === 0 ? 10 : ""}
          transform={cx(`rotate(${(i / 7) * 360}, 0, 0)`, "translate(0, -80)")}
          stroke="#ffffff60"
        />
      ))}

      {["S", "M", "T", "W", "T", "F", "S"].map((v, i) => {
        const flip = i >= 2 && i <= 4;
        return (
          <text key={i} transform={`rotate(${(-(i + 0.5) / 7) * 360})`}>
            <textPath
              strokeWidth={0}
              fill="#ffffff60"
              className={cx("text-x20", "font-bold")}
              textAnchor={"middle"}
              startOffset="50%"
              alignmentBaseline={"central"}
              href={flip ? "#textpath-reverse" : "#textpath"}
            >
              {v}
            </textPath>
          </text>
        );
      })}

      <SmallDialHand angle={angle} />
    </g>
  );
}

export function SmallDialHand({ angle }: { angle: number }) {
  return (
    <g filter="url(#shadow1)">
      <defs>
        <polygon
          id="weekday-dial-hand"
          points={cx(
            `${-15 / 2},${-47}`,
            `${0},${-55}`,
            `${15 / 2},${-47}`,
            `${30 / 2},${0}`,
            `${-30 / 2},${0}`,
            `${-15 / 2},${-47}`
          )}
          transform={`rotate(${angle})`}
        />

        <circle id="weekday-dial-circle" r={30 / 2} />

        <g id="weekday-dial-shape">
          <use href="#weekday-dial-hand" />
          <use href="#weekday-dial-circle" />
        </g>

        <clipPath id="weekday-dial-clip">
          <use href="#weekday-dial-hand" />
          <use href="#weekday-dial-circle" />
        </clipPath>

        <filter id="erode">
          <feMorphology operator="erode" radius="1.25" />
        </filter>

        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>

      <g>
        <use href="#weekday-dial-shape" fill="#808080" />

        <g fill="#e0a000" clipPath="url(#weekday-dial-clip)">
          <rect
            x={-50 / 2}
            y={-55}
            width={50}
            height={20}
            transform={`rotate(${angle})`}
          />
        </g>
      </g>

      <mask id="weekday-dial-light">
        <use
          href="#weekday-dial-shape"
          fill="#ffffff"
          filter="url(#erode) url(#blur)"
          transform="translate(-2,-2)"
        />

        <use href="#weekday-dial-shape" fill="#000000" filter="url(#erode)" />
      </mask>

      <mask id="weekday-dial-shadow">
        <use
          href="#weekday-dial-shape"
          fill="#ffffff"
          filter="url(#erode) url(#blur)"
          transform="translate(2,2)"
        />

        <use href="#weekday-dial-shape" fill="#000000" filter="url(#erode)" />
      </mask>

      <use
        href="#weekday-dial-shape"
        fill="#ffffff80"
        mask="url(#weekday-dial-light)"
      />

      <use
        href="#weekday-dial-shape"
        fill="#00000080"
        mask="url(#weekday-dial-shadow)"
      />
    </g>
  );
}
