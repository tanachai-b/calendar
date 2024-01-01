import { keyColors } from "./Key";

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
    color?: keyof typeof keyColors;
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

export const consonantsLayout: KeyboardLayout = {
  "`": { top: "`" },
  "1": { top: "1" },
  "2": { top: "2" },
  "3": { top: "3" },
  "4": { top: "4" },
  "5": { top: "5" },
  "6": { top: "6" },
  "7": { top: "7" },
  "8": { top: "8" },
  "9": { top: "9" },
  "0": { top: "0" },
  "-": { top: "-" },
  "=": { top: "=" },

  q: { top: "ป", color: "pink" },
  w: { top: "บ", color: "pink" },
  e: { top: "ม", color: "pink" },
  r: { top: "พ", color: "pink" },
  t: { top: "ผ", color: "pink" },
  y: { top: "ฝ", color: "purple" },
  u: { top: "ส", color: "purple" },
  i: { top: "ห", color: "purple" },
  o: { top: "จ", color: "darkBlue" },
  p: { top: "ช", color: "darkBlue" },
  "[": { top: "" },
  "]": { top: "" },
  "\\": { top: "" },

  a: { top: "ต", color: "orange" },
  s: { top: "ด", color: "orange" },
  d: { top: "น", color: "orange" },
  f: { top: "ท", color: "orange" },
  g: { top: "x้", color: "green" },
  h: { top: "x่", color: "green" },
  j: { top: "ค", color: "blue" },
  k: { top: "ง", color: "blue" },
  l: { top: "ก", color: "blue" },
  ";": { top: "ข", color: "blue" },
  "'": { top: "" },

  z: { top: "x์", color: "green" },
  x: { top: "ถ", color: "orange" },
  c: { top: "ว", color: "yellow" },
  v: { top: "ล", color: "yellow" },
  b: { top: "xx" },
  n: { top: "ร", color: "yellow" },
  m: { top: "ย", color: "yellow" },
  ",": { top: "อ", color: "yellow" },
  ".": { top: "ญ", color: "darkBlue" },
  "/": { top: "ฉ", color: "darkBlue" },
};

export const consonantShiftsLayout: KeyboardLayout = {
  "`": { top: "`" },
  "1": { top: "1" },
  "2": { top: "2" },
  "3": { top: "3" },
  "4": { top: "4" },
  "5": { top: "5" },
  "6": { top: "6" },
  "7": { top: "7" },
  "8": { top: "8" },
  "9": { top: "9" },
  "0": { top: "0" },
  "-": { top: "-" },
  "=": { top: "=" },

  q: { top: "ฑ", color: "pink" },
  w: { top: "ณ", color: "pink" },
  e: { top: "หม", color: "pink" },
  r: { top: "ภ", color: "pink" },
  t: { top: "ฒ", color: "pink" },
  y: { top: "ฟ", color: "purple" },
  u: { top: "ซ", color: "purple" },
  i: { top: "ฮ", color: "purple" },
  o: { top: "", color: "darkBlue" },
  p: { top: "ฌ", color: "darkBlue" },
  "[": { top: "" },
  "]": { top: "" },
  "\\": { top: "" },

  a: { top: "ฏ", color: "orange" },
  s: { top: "ฎ", color: "orange" },
  d: { top: "หน", color: "orange" },
  f: { top: "ธ", color: "orange" },
  g: { top: "x๋", color: "green" },
  h: { top: "x๊", color: "green" },
  j: { top: "ฆ", color: "blue" },
  k: { top: "หง", color: "blue" },
  l: { top: "ศ", color: "blue" },
  ";": { top: "ษ", color: "blue" },
  "'": { top: "" },

  z: { top: "xxิ", color: "green" },
  x: { top: "ฐ", color: "orange" },
  c: { top: "หว", color: "yellow" },
  v: { top: "หล", color: "yellow" },
  b: { top: "ฤ" },
  n: { top: "หร", color: "yellow" },
  m: { top: "หย", color: "yellow" },
  ",": { top: "ฬ", color: "yellow" },
  ".": { top: "หญ", color: "darkBlue" },
  "/": { top: "", color: "darkBlue" },
};

export const vowelsLayout: KeyboardLayout = {
  "`": { top: "`" },
  "1": { top: "1" },
  "2": { top: "2" },
  "3": { top: "3" },
  "4": { top: "4" },
  "5": { top: "5" },
  "6": { top: "6" },
  "7": { top: "7" },
  "8": { top: "8" },
  "9": { top: "9" },
  "0": { top: "0" },
  "-": { top: "-" },
  "=": { top: "=" },

  q: { top: "เอา", color: "pink" },
  w: { top: "โอ", color: "orange" },
  e: { top: "โอะ", color: "orange" },
  r: { top: "เอือ", color: "pink" },
  t: { top: "เออะ", color: "darkBlue" },
  y: { top: "เออ", color: "darkBlue" },
  u: { top: "อะ", color: "darkBlue" },
  i: { top: "อา", color: "darkBlue" },
  o: { top: "เอ", color: "blue" },
  p: { top: "ไอ", color: "pink" },
  "[": { top: "" },
  "]": { top: "" },
  "\\": { top: "" },

  a: { top: "อู", color: "orange" },
  s: { top: "อุ", color: "orange" },
  d: { top: "ออ", color: "orange" },
  f: { top: "อัว", color: "pink" },
  g: { top: "x้", color: "green" },
  h: { top: "x่", color: "green" },
  j: { top: "เอีย", color: "pink" },
  k: { top: "แอ", color: "blue" },
  l: { top: "อิ", color: "blue" },
  ";": { top: "อี", color: "blue" },
  "'": { top: "" },

  z: { top: "x์", color: "green" },
  x: { top: "อำ", color: "pink" },
  c: { top: "xว", color: "yellow" },
  v: { top: "xล", color: "yellow" },
  b: { top: "xx" },
  n: { top: "xร", color: "yellow" },
  m: { top: "xย", color: "yellow" },
  ",": { top: "เอะ", color: "blue" },
  ".": { top: "อึ", color: "darkBlue" },
  "/": { top: "อือ", color: "darkBlue" },
};

export const vowelShiftsLayout: KeyboardLayout = {
  "`": { top: "`" },
  "1": { top: "1" },
  "2": { top: "2" },
  "3": { top: "3" },
  "4": { top: "4" },
  "5": { top: "5" },
  "6": { top: "6" },
  "7": { top: "7" },
  "8": { top: "8" },
  "9": { top: "9" },
  "0": { top: "0" },
  "-": { top: "-" },
  "=": { top: "=" },

  q: { top: "อ็", color: "pink" },
  w: { top: "", color: "orange" },
  e: { top: "", color: "orange" },
  r: { top: "", color: "pink" },
  t: { top: "", color: "darkBlue" },
  y: { top: "", color: "darkBlue" },
  u: { top: "", color: "darkBlue" },
  i: { top: "", color: "darkBlue" },
  o: { top: "", color: "blue" },
  p: { top: "ใอ", color: "pink" },
  "[": { top: "" },
  "]": { top: "" },
  "\\": { top: "" },

  a: { top: "", color: "orange" },
  s: { top: "", color: "orange" },
  d: { top: "เอาะ", color: "orange" },
  f: { top: "", color: "pink" },
  g: { top: "x๋", color: "green" },
  h: { top: "x๊", color: "green" },
  j: { top: "", color: "pink" },
  k: { top: "แอะ", color: "blue" },
  l: { top: "", color: "blue" },
  ";": { top: "", color: "blue" },
  "'": { top: "" },

  z: { top: "xxิ", color: "green" },
  x: { top: "xรร", color: "pink" },
  c: { top: "xว", color: "yellow" },
  v: { top: "xล", color: "yellow" },
  b: { top: "xฤ" },
  n: { top: "xร", color: "yellow" },
  m: { top: "xย", color: "yellow" },
  ",": { top: "", color: "blue" },
  ".": { top: "", color: "darkBlue" },
  "/": { top: "", color: "darkBlue" },
};
