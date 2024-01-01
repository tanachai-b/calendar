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

export type KeyboardLayout = {
  [Key in KeyboardKey]?: {
    top?: string;
    bottom?: string;
    topRight?: string;
    bottomRight?: string;
  };
};

export const qwertyLayout: KeyboardLayout = {
  "`": { top: "~", bottom: "`" },
  "1": { top: "!", bottom: "1" },
  "2": { top: "@", bottom: "2" },
  "3": { top: "#", bottom: "3" },
  "4": { top: "$", bottom: "4" },
  "5": { top: "%", bottom: "5" },
  "6": { top: "^", bottom: "6" },
  "7": { top: "&", bottom: "7" },
  "8": { top: "*", bottom: "8" },
  "9": { top: "(", bottom: "9" },
  "0": { top: ")", bottom: "0" },
  "-": { top: "_", bottom: "-" },
  "=": { top: "+", bottom: "=" },
  q: { top: "Q", bottom: "" },
  w: { top: "W", bottom: "" },
  e: { top: "E", bottom: "" },
  r: { top: "R", bottom: "" },
  t: { top: "T", bottom: "" },
  y: { top: "Y", bottom: "" },
  u: { top: "U", bottom: "" },
  i: { top: "I", bottom: "" },
  o: { top: "O", bottom: "" },
  p: { top: "P", bottom: "" },
  "[": { top: "{", bottom: "[" },
  "]": { top: "}", bottom: "]" },
  "\\": { top: "|", bottom: "\\" },
  a: { top: "A", bottom: "" },
  s: { top: "S", bottom: "" },
  d: { top: "D", bottom: "" },
  f: { top: "F", bottom: "" },
  g: { top: "G", bottom: "" },
  h: { top: "H", bottom: "" },
  j: { top: "J", bottom: "" },
  k: { top: "K", bottom: "" },
  l: { top: "L", bottom: "" },
  ";": { top: ":", bottom: ";" },
  "'": { top: '"', bottom: "'" },
  z: { top: "Z", bottom: "" },
  x: { top: "X", bottom: "" },
  c: { top: "C", bottom: "" },
  v: { top: "V", bottom: "" },
  b: { top: "B", bottom: "" },
  n: { top: "N", bottom: "" },
  m: { top: "M", bottom: "" },
  ",": { top: "<", bottom: "," },
  ".": { top: ">", bottom: "." },
  "/": { top: "?", bottom: "/" },
};
