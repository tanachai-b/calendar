import { consonantMappings, vowelMappings } from "./keyMappings";

export function applyDoubleStroke(keys: string[]) {
  const appliedDoubleStroke = keys.reduce<
    { key: string; type: string; switch: boolean }[]
  >((prev, key) => {
    const consonant = consonantMappings[key] ?? { key: key, switchx: true };
    const vowel = vowelMappings[key] ?? { key: key, switchx: true };

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

  return appliedDoubleStroke.map(({ key }) => key);
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
