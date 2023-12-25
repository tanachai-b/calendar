export function toText(
  input: {
    year?: string;
    month?: string;
    day?: string;
    keypoints?: string[];
    notes?: { time?: string; note?: string }[];
  }[]
) {
  const joinedNoteLines = joinNoteLines(input);
  const joinedSubParameters = joinSubParameters(joinedNoteLines);
  const joinedParameters = joinParameters(joinedSubParameters);
  return joinedParameters.join("\n");
}

function joinNoteLines(
  input: {
    year?: string;
    month?: string;
    day?: string;
    keypoints?: string[];
    notes?: { time?: string; note?: string }[];
  }[]
) {
  return input.map(({ year, month, day, keypoints, notes }) => ({
    year,
    month,
    day,
    keypoints,
    notes: notes?.map(({ time, note }) => ({
      time,
      note: note?.replace(/\n/g, "\n^ "),
    })),
  }));
}

function joinSubParameters(
  joinedNoteLines: {
    year?: string;
    month?: string;
    day?: string;
    keypoints?: string[];
    notes?: { time?: string; note?: string }[];
  }[]
) {
  return joinedNoteLines.map(({ year, month, day, keypoints, notes }) => ({
    year,
    month,
    day,
    keypoints: keypoints?.map((v) => `> ${v}`).join("\n") ?? "",
    notes:
      notes
        ?.map(({ time, note }) => `- ${`${time ?? ""} ${note ?? ""}`.trim()}`)
        .join("\n\n") ?? "",
  }));
}

function joinParameters(
  joinedSubParameters: {
    year?: string;
    month?: string;
    day?: string;
    keypoints?: string;
    notes?: string;
  }[]
) {
  return joinedSubParameters.map(({ year, month, day, keypoints, notes }) => {
    return `${year}-${month}-${day}${keypoints ? `\n\n${keypoints}` : ""}${
      notes ? `\n\n${notes}` : ""
    }\n`;
  });
}
