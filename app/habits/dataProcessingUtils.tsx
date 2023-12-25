export function processData(data: string) {
  const splitedDays = splitDays(data);

  const objectDays = splitedDays.map((day) => objectDay(day));

  const splitedParameters = objectDays.map((day) => splitParameters(day));

  const splitedNotes = splitedParameters.map((day) => splitNotes(day));

  return splitedNotes;
}

export function splitDays(data: string) {
  return (
    data
      // .trim()
      .replace(/\n(\d{4}-\d{1,2}-\d{1,2})/gm, "<new_line>$1")
      .split("<new_line>")
    // .slice(1)
  );
  // .map((value) => value.trim());
}

function objectDay(day: string) {
  return {
    date: day.match(/^\d{4}-\d{1,2}-\d{1,2}/)?.[0],
    keypoints: day.replace(/^-.*/ms, "").match(/^>.*/ms)?.[0].trim(),
    notes: day.match(/^-.*/ms)?.[0].trim(),
  };
}

function splitParameters({
  date,
  keypoints,
  notes,
}: {
  date?: string;
  keypoints?: string;
  notes?: string;
}) {
  return {
    year: date?.split("-")[0],
    month: date?.split("-")[1],
    day: date?.split("-")[2],
    keypoints: keypoints
      ?.split(/^>/gm)
      .slice(1)
      .map((v) => v.trim()),
    notes: notes
      ?.split(/^-/gm)
      .slice(1)
      .map((v) => v.replace(/^\^ */gm, "").trim()),
  };
}

function splitNotes({
  year,
  month,
  day,
  keypoints,
  notes,
}: {
  year?: string;
  month?: string;
  day?: string;
  keypoints?: string[];
  notes?: string[];
}) {
  return {
    year,
    month,
    day,
    keypoints,
    notes: notes?.map((note) => ({
      time: note.match(/^~?\d{1,2}:\d{1,2}/)?.[0],
      note: note
        .substring(note.match(/^~?\d{1,2}:\d{1,2}/)?.[0]?.length ?? 0)
        .trim(),
    })),
  };
}
