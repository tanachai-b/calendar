export const consonantMappings: {
  [key: string]: { key: string; switch: boolean };
} = {
  q: { key: "c_ป", switch: true },
  w: { key: "c_บ", switch: true },
  e: { key: "c_ม", switch: true },
  r: { key: "c_พ", switch: true },
  t: { key: "c_ผ", switch: true },

  y: { key: "c_ฝ", switch: true },
  u: { key: "c_ส", switch: true },
  i: { key: "c_ห", switch: true },
  o: { key: "c_จ", switch: true },
  p: { key: "c_ช", switch: true },

  a: { key: "c_ต", switch: true },
  s: { key: "c_ด", switch: true },
  d: { key: "c_น", switch: true },
  f: { key: "c_ท", switch: true },
  g: { key: "t_้", switch: false },

  h: { key: "t_่", switch: false },
  j: { key: "c_ค", switch: true },
  k: { key: "c_ง", switch: true },
  l: { key: "c_ก", switch: true },
  ";": { key: "c_ข", switch: true },

  z: { key: "z", switch: true },
  x: { key: "c_ถ", switch: true },
  c: { key: "c_ว", switch: true },
  v: { key: "c_ล", switch: true },
  b: { key: "b", switch: true },

  n: { key: "c_ร", switch: true },
  m: { key: "c_ย", switch: true },
  ",": { key: "c_อ", switch: true },
  ".": { key: "c_ญ", switch: true },
  "/": { key: "c_ฉ", switch: true },
};

export const vowelMappings: {
  [key: string]: { key: string; switch: boolean };
} = {
  q: { key: "v_เctา", switch: true },
  w: { key: "v_โct", switch: true },
  e: { key: "v_โctะ", switch: true },
  r: { key: "v_เcืtอ", switch: true },
  t: { key: "v_เctอะ", switch: true },

  y: { key: "v_เctอ", switch: true },
  u: { key: "v_ctะ", switch: true },
  i: { key: "v_ctา", switch: true },
  o: { key: "v_เct", switch: true },
  p: { key: "v_ไct", switch: true },

  a: { key: "v_cูt", switch: true },
  s: { key: "v_cุt", switch: true },
  d: { key: "v_ctอ", switch: true },
  f: { key: "v_cัtว", switch: true },
  g: { key: "t_้", switch: false },

  h: { key: "t_่", switch: false },
  j: { key: "v_เcีtย", switch: true },
  k: { key: "v_แct", switch: true },
  l: { key: "v_cิt", switch: true },
  ";": { key: "v_cีt", switch: true },

  z: { key: "z", switch: true },
  x: { key: "v_ctำ", switch: true },
  c: { key: "x_ว", switch: false },
  v: { key: "x_ล", switch: false },
  b: { key: "b", switch: true },

  n: { key: "x_ร", switch: false },
  m: { key: "x_ย", switch: false },
  ",": { key: "v_เctะ", switch: true },
  ".": { key: "v_cึt", switch: true },
  "/": { key: "v_cืtอ", switch: true },
};
