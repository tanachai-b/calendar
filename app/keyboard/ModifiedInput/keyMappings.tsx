export const consonantMappings: {
  [key: string]: { key: string; switch: boolean; label: string };
} = {
  q: { key: "c_ป", switch: true, label: "ป" },
  w: { key: "c_บ", switch: true, label: "บ" },
  e: { key: "c_ม", switch: true, label: "ม" },
  r: { key: "c_พ", switch: true, label: "พ" },
  t: { key: "c_ผ", switch: true, label: "ผ" },

  y: { key: "c_ฝ", switch: true, label: "ฝ" },
  u: { key: "c_ส", switch: true, label: "ส" },
  i: { key: "c_ห", switch: true, label: "ห" },
  o: { key: "c_จ", switch: true, label: "จ" },
  p: { key: "c_ช", switch: true, label: "ช" },

  a: { key: "c_ต", switch: true, label: "ต" },
  s: { key: "c_ด", switch: true, label: "ด" },
  d: { key: "c_น", switch: true, label: "น" },
  f: { key: "c_ท", switch: true, label: "ท" },
  g: { key: "t_้", switch: false, label: "อ้" },

  h: { key: "t_่", switch: false, label: "อ่" },
  j: { key: "c_ค", switch: true, label: "ค" },
  k: { key: "c_ง", switch: true, label: "ง" },
  l: { key: "c_ก", switch: true, label: "ก" },
  ";": { key: "c_ข", switch: true, label: "ข" },

  z: { key: "z", switch: true, label: "z" },
  x: { key: "c_ถ", switch: true, label: "ถ" },
  c: { key: "c_ว", switch: true, label: "ว" },
  v: { key: "c_ล", switch: true, label: "ล" },
  b: { key: "b", switch: true, label: "b" },

  n: { key: "c_ร", switch: true, label: "ร" },
  m: { key: "c_ย", switch: true, label: "ย" },
  ",": { key: "c_อ", switch: true, label: "อ" },
  ".": { key: "c_ญ", switch: true, label: "ญ" },
  "/": { key: "c_ฉ", switch: true, label: "ฉ" },
};

export const vowelMappings: {
  [key: string]: { key: string; switch: boolean; label: string };
} = {
  q: { key: "v_เctา", switch: true, label: "เอา" },
  w: { key: "v_โct", switch: true, label: "โอ" },
  e: { key: "v_โctะ", switch: true, label: "โอะ" },
  r: { key: "v_เcืtอ", switch: true, label: "เอือ" },
  t: { key: "v_เctอะ", switch: true, label: "เออะ" },

  y: { key: "v_เctอ", switch: true, label: "เออ" },
  u: { key: "v_ctะ", switch: true, label: "อะ" },
  i: { key: "v_ctา", switch: true, label: "อา" },
  o: { key: "v_เct", switch: true, label: "เอ" },
  p: { key: "v_ไct", switch: true, label: "ไอ" },

  a: { key: "v_cูt", switch: true, label: "อู" },
  s: { key: "v_cุt", switch: true, label: "อุ" },
  d: { key: "v_ctอ", switch: true, label: "ออ" },
  f: { key: "v_cัtว", switch: true, label: "อัว" },
  g: { key: "t_้", switch: false, label: "อ้" },

  h: { key: "t_่", switch: false, label: "อ่" },
  j: { key: "v_เcีtย", switch: true, label: "เอีย" },
  k: { key: "v_แct", switch: true, label: "แอ" },
  l: { key: "v_cิt", switch: true, label: "อิ" },
  ";": { key: "v_cีt", switch: true, label: "อี" },

  z: { key: "z", switch: true, label: "z" },
  x: { key: "v_ctำ", switch: true, label: "อำ" },
  c: { key: "x_ว", switch: false, label: "ว" },
  v: { key: "x_ล", switch: false, label: "ล" },
  b: { key: "b", switch: true, label: "b" },

  n: { key: "x_ร", switch: false, label: "ร" },
  m: { key: "x_ย", switch: false, label: "ย" },
  ",": { key: "v_เctะ", switch: true, label: "เอะ" },
  ".": { key: "v_cึt", switch: true, label: "อึ" },
  "/": { key: "v_cืtอ", switch: true, label: "อือ" },
};
