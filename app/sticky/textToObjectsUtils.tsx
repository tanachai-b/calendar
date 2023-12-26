export function textToObjects(text: string) {
  const splittedDays = splitDays(text);
  const objectifiedDays = splittedDays.map((day) => objectifyDay(day));
  const splittedParameters = objectifiedDays.map((day) => splitParameters(day));
  const splittedNotes = splittedParameters.map((day) => splitNotes(day));
  return splittedNotes;
}

export function splitDays(data: string) {
  return data.replace(/\n(\d+: )/g, "<split>$1").split("<split>");
}

function objectifyDay(day: string) {
  return {
    day: day.match(/^\d+(?=: )/)?.[0],
    notes: day.replace(/^\d+: +/, ""),
  };
}

function splitParameters({ day, notes }: { day?: string; notes?: string }) {
  return {
    day,
    notes: notes?.split(/\n *- */g),
  };
}

function splitNotes({ day, notes }: { day?: string; notes?: string[] }) {
  return {
    day,
    notes: notes?.map((note) => {
      const splitted = note.split(/\n *\^ */g);
      return {
        topic: splitted[0].trim(),
        details: splitted.slice(1).map((v) => v.trim().replace(/\s+/, " ")),
      };
    }),
  };
}
