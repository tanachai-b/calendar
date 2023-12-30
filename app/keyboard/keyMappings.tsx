export const consonantMappings: {
  [key: string]: { key: string; switch: boolean };
} = {
  q: { key: "q", switch: true },
  w: { key: "w", switch: true },
  e: { key: "e", switch: true },
  r: { key: "r", switch: true },
  t: { key: "t", switch: true },

  y: { key: "y", switch: true },
  u: { key: "u", switch: true },
  i: { key: "i", switch: true },
  o: { key: "o", switch: true },
  p: { key: "p", switch: true },

  a: { key: "a", switch: true },
  s: { key: "s", switch: true },
  d: { key: "d", switch: true },
  f: { key: "f", switch: true },
  g: { key: "t_้", switch: false },

  h: { key: "t_่", switch: false },
  j: { key: "c_ค", switch: true },
  k: { key: "c_ง", switch: true },
  l: { key: "c_ก", switch: true },
  ";": { key: ";", switch: true },

  z: { key: "z", switch: true },
  x: { key: "x", switch: true },
  c: { key: "c", switch: true },
  v: { key: "c_ล", switch: true },
  b: { key: "b", switch: true },

  n: { key: "c_ร", switch: true },
  m: { key: "m", switch: true },
  ",": { key: ",", switch: true },
  ".": { key: ".", switch: true },
  "/": { key: "/", switch: true },
};

export const vowelMappings: {
  [key: string]: { key: string; switch: boolean };
} = {
  q: { key: "q", switch: true },
  w: { key: "w", switch: true },
  e: { key: "e", switch: true },
  r: { key: "r", switch: true },
  t: { key: "t", switch: true },

  y: { key: "y", switch: true },
  u: { key: "u", switch: true },
  i: { key: "i", switch: true },
  o: { key: "o", switch: true },
  p: { key: "p", switch: true },

  a: { key: "a", switch: true },
  s: { key: "s", switch: true },
  d: { key: "d", switch: true },
  f: { key: "f", switch: true },
  g: { key: "t_้", switch: false },

  h: { key: "t_่", switch: false },
  j: { key: "v_เcีtย", switch: true },
  k: { key: "k", switch: true },
  l: { key: "l", switch: true },
  ";": { key: ";", switch: true },

  z: { key: "z", switch: true },
  x: { key: "x", switch: true },
  c: { key: "c", switch: true },
  v: { key: "x_ล", switch: false },
  b: { key: "b", switch: true },

  n: { key: "x_ร", switch: false },
  m: { key: "m", switch: true },
  ",": { key: ",", switch: true },
  ".": { key: ".", switch: true },
  "/": { key: "/", switch: true },
};
