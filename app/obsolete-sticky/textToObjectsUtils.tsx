import { monthNames } from "../constants";

export function textToObjectsAAA(text: string) {
  const splittedMonths = splitMonths(text);
  const objectifiedMonths = splittedMonths.map((month) =>
    objectifyMonths(month)
  );

  const processDays = objectifiedMonths.map(({ monthName, days }) => {
    const splittedDays = splitDays(days);

    return {
      month: monthName ? monthNames.indexOf(monthName) + 1 : undefined,
      days: splittedDays,
    };
  });

  return processDays;
}

export function textToObjects(text: string) {
  const splittedMonths = splitMonths(text);
  const objectifiedMonths = splittedMonths.map((month) =>
    objectifyMonths(month)
  );

  const processDays = objectifiedMonths.map(({ monthName, days }) => {
    const splittedDays = splitDays(days);
    const objectifiedDays = splittedDays.map((day) => objectifyDay(day));
    const splittedParameters = objectifiedDays.map((day) =>
      splitParameters(day)
    );
    const splittedNotes = splittedParameters.map((day) => splitNotes(day));

    return {
      month: monthName ? monthNames.indexOf(monthName) + 1 : undefined,
      days: splittedNotes,
    };
  });

  return processDays;
}

export function splitMonths(data: string) {
  return data
    .replace(
      /\n(January|February|March|April|May|June|July|August|September|October|November|December)/g,
      "<split>$1"
    )
    .split("<split>");
}

export function objectifyMonths(month: string) {
  return {
    monthName: month.match(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)/g
    )?.[0],
    days: month.replace(
      /^(January|February|March|April|May|June|July|August|September|October|November|December).*/g,
      ""
    ),
  };
}

export function splitDays(data: string) {
  return data
    .replace(/\n(\d+: )/g, "<split>$1")
    .split("<split>")
    .slice(1);
}

function objectifyDay(day: string) {
  return {
    day: day.match(/^\d+(?=: )/)?.[0],
    notes: day.replace(/^\d+: +/, ""),
  };
}

function splitParameters({ day, notes }: { day?: string; notes?: string }) {
  return {
    day: day ? parseInt(day) : undefined,
    notes: notes?.split(/\n *- */g),
  };
}

function splitNotes({ day, notes }: { day?: number; notes?: string[] }) {
  return {
    day,
    notes: notes?.map((note) => {
      const splitted = note.split(/\n *\^ */g);
      return {
        topic: splitted[0].trim().replace(/\s+/g, " "),
        details: splitted.slice(1).map((v) => v.trim().replace(/\s+/g, " ")),
      };
    }),
  };
}
