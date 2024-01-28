"use client";

export function SvgDefinitions() {
  return (
    <defs>
      <filter id="shadow1">
        <feDropShadow dx={5} dy={5} stdDeviation={1} floodOpacity={0.5} />
      </filter>

      <filter id="shadow2">
        <feDropShadow dx={3} dy={3} stdDeviation={1} floodOpacity={0.5} />
      </filter>

      <path
        id="textpath"
        fill="none"
        stroke="none"
        d="M -65 0 A 65 65 0 0 1 65 0"
      />

      <path
        id="textpath-reverse"
        fill="none"
        stroke="none"
        d="M 65 0 A 65 65 0 0 0 -65 0"
      />
    </defs>
  );
}
