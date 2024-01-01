import { consonantMappings, vowelMappings } from "./keyMappings";

function translateKeys(keys: string[]) {
  return keys.reduce<
    { key: string; type: "consonant" | "vowel"; switch: boolean }[]
  >((prev, key) => {
    const consonant = consonantMappings[key] ?? { key: key, switch: true };
    const vowel = vowelMappings[key] ?? { key: key, switch: true };

    if (prev.length === 0) {
      return [
        { key: consonant.key, type: "consonant", switch: consonant.switch },
      ];
    }

    const last = prev[prev.length - 1];

    if (last.type === "consonant") {
      if (last.switch) {
        return [
          ...prev,
          { key: vowel.key, type: "vowel", switch: vowel.switch },
        ];
      } else if (!last.switch) {
        return [
          ...prev,
          { key: consonant.key, type: "consonant", switch: consonant.switch },
        ];
      }
    } else if (last.type === "vowel") {
      if (last.switch) {
        return [
          ...prev,
          { key: consonant.key, type: "consonant", switch: consonant.switch },
        ];
      } else if (!last.switch) {
        return [
          ...prev,
          { key: vowel.key, type: "vowel", switch: vowel.switch },
        ];
      }
    }

    return [...prev];
  }, []);
}

export function getNextType(keys: string[]) {
  if (keys.length === 0) return "consonant";

  const translatedKeys = translateKeys(keys);
  const last = translatedKeys[translatedKeys.length - 1];

  if (last.type === "consonant") {
    if (last.switch) {
      return "vowel";
    } else if (!last.switch) {
      return "consonant";
    }
  } else if (last.type === "vowel") {
    if (last.switch) {
      return "consonant";
    } else if (!last.switch) {
      return "vowel";
    }
  }

  return "consonant";
}

export function applyDoubleStroke(keys: string[]) {
  return translateKeys(keys).map(({ key }) => key);
}

export function combineConsonants(keys: string[]) {
  return keys.reduce<string[]>((prev, curr) => {
    if (prev.length === 0) {
      return [curr];
    }

    const last = prev[prev.length - 1];

    if (last.startsWith("c_") && curr.startsWith("x_")) {
      return [...prev.slice(0, -1), `c_${last.slice(2)}${curr.slice(2)}`];
    } else {
      return [...prev, curr];
    }
  }, []);
}

export function combineVowels(keys: string[]) {
  return keys.reduce<string[]>((prev, curr) => {
    if (prev.length === 0) {
      return [curr];
    }

    const last = prev[prev.length - 1];

    if (last.startsWith("c_") && curr.startsWith("v_")) {
      return [
        ...prev.slice(0, -1),
        `v_${curr.slice(2).replace(/c/, last.slice(2))}`,
      ];
    } else {
      return [...prev, curr];
    }
  }, []);
}

export function combineEndings(keys: string[]) {
  return keys.reduce<string[]>((prev, curr) => {
    if (prev.length === 0) {
      return [curr];
    }

    const last = prev[prev.length - 1];

    if (last.startsWith("v_") && curr.startsWith("c_")) {
      return [...prev.slice(0, -1), `${last}${curr.slice(2)}`];
    } else {
      return [...prev, curr];
    }
  }, []);
}

export function combineTones(keys: string[]) {
  return keys.reduce<string[]>((prev, curr) => {
    if (prev.length === 0) {
      return [curr];
    }

    const last = prev[prev.length - 1];

    if (last.startsWith("v_") && curr.startsWith("t_")) {
      return [
        ...prev.slice(0, -1),
        `v_${last.slice(2).replace(/t/, curr.slice(2))}`,
      ];
    } else {
      return [...prev, curr];
    }
  }, []);
}

export function removeMarkers(keys: string[]) {
  return keys.map((curr) => {
    if (curr.startsWith("v_")) {
      return curr.slice(2).replace(/t/, "");
    } else if (curr.startsWith("c_")) {
      return curr.slice(2);
    } else {
      return curr;
    }
  });
}
