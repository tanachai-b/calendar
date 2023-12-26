export function textToObjects(text: string) {
  const splittedDays = splitDays(text);
  const objectifiedDays = splittedDays.map((day) => objectifyDay(day));
  const splittedParameters = objectifiedDays.map((day) => splitParameters(day));
  const splittedNotes = splittedParameters.map((day) => splitNotes(day));
  return splittedNotes;
}

export function splitDays(data: string) {
  return data.replace(/\n(\d+:)/gm, "<new_line>$1").split("<new_line>");
}

function objectifyDay(day: string) {
  return {
    day: day.match(/^\d+(?=:)/)?.[0],
    notes: day.replace(/^\d+:/, "-"),
  };
}

function splitParameters({ day, notes }: { day?: string; notes?: string }) {
  return {
    day,
    notes: notes?.replace(/^ *-/gm, "<new_line>").split("<new_line>").slice(1),
  };
}

function splitNotes({ day, notes }: { day?: string; notes?: string[] }) {
  return {
    day,
    notes: notes?.map((note) =>
      note
        .trim()
        .replace(/ +/g, " ")
        .replace(/\n+/g, "\n")
        .replace(/ *\n *\^ */gm, "\n")
    ),
  };
}
