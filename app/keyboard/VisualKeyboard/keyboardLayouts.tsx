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

  q: { top: "เอา" },
  w: { top: "โอ" },
  e: { top: "โอะ" },
  r: { top: "เอือ" },
  t: { top: "เออะ" },
  y: { top: "เออ" },
  u: { top: "อะ" },
  i: { top: "อา" },
  o: { top: "เอ" },
  p: { top: "ไอ" },
  "[": { top: "" },
  "]": { top: "" },
  "\\": { top: "" },

  a: { top: "อู" },
  s: { top: "อุ" },
  d: { top: "ออ" },
  f: { top: "อัว" },
  g: { top: "x้" },
  h: { top: "x่" },
  j: { top: "เอีย" },
  k: { top: "แอ" },
  l: { top: "อิ" },
  ";": { top: "อี" },
  "'": { top: "" },

  z: { top: "x์" },
  x: { top: "อำ" },
  c: { top: "xว" },
  v: { top: "xล" },
  b: { top: "xx" },
  n: { top: "xร" },
  m: { top: "xย" },
  ",": { top: "เอะ" },
  ".": { top: "อึ" },
  "/": { top: "อือ" },
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

  q: { top: "อ็" },
  w: { top: "" },
  e: { top: "" },
  r: { top: "" },
  t: { top: "" },
  y: { top: "" },
  u: { top: "" },
  i: { top: "" },
  o: { top: "" },
  p: { top: "ใอ" },
  "[": { top: "" },
  "]": { top: "" },
  "\\": { top: "" },

  a: { top: "" },
  s: { top: "" },
  d: { top: "เอาะ" },
  f: { top: "" },
  g: { top: "x๋" },
  h: { top: "x๊" },
  j: { top: "" },
  k: { top: "แอะ" },
  l: { top: "" },
  ";": { top: "" },
  "'": { top: "" },

  z: { top: "xxิ" },
  x: { top: "xรร" },
  c: { top: "xว" },
  v: { top: "xล" },
  b: { top: "xฤ" },
  n: { top: "xร" },
  m: { top: "xย" },
  ",": { top: "" },
  ".": { top: "" },
  "/": { top: "" },
};
