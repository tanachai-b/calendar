import { monthNames } from "../constants";

export function objectsToText(
  input: {
    month?: number;
    days: {
      day?: number;
      notes?: {
        topic: string;
        details: string[];
      }[];
    }[];
  }[]
) {
  const joinedNoteLines = joinDetails(input);
  const joinedTopicDetails = joinTopicDetails(joinedNoteLines);
  const joinedNotes = joinNotes(joinedTopicDetails);
  const joinedDayNotes = joinDayNotes(joinedNotes);
  const joinedDays = joinDays(joinedDayNotes);
  const joinedMonthDays = joinMonthDays(joinedDays);
  const joinedMonths = joinMonths(joinedMonthDays);

  return joinedMonths;
}

function joinDetails(
  input: {
    month?: number;
    days: {
      day?: number;
      notes?: {
        topic: string;
        details: string[];
      }[];
    }[];
  }[]
) {
  return input.map(({ month, days }) => ({
    month,
    days: days.map(({ day, notes }) => ({
      day,
      notes: notes?.map(({ topic, details }) => ({
        topic,
        details: details.map((detail) => `^ ${detail}`).join("\n"),
      })),
    })),
  }));
}

function joinTopicDetails(
  input: {
    month?: number;
    days: {
      day?: number;
      notes?: {
        topic: string;
        details: string;
      }[];
    }[];
  }[]
) {
  return input.map(({ month, days }) => ({
    month,
    days: days.map(({ day, notes }) => ({
      day,
      notes: notes?.map(
        ({ topic, details }) =>
          `- ${topic}${details !== "" ? `\n${details}` : ""}`
      ),
    })),
  }));
}

function joinNotes(
  input: {
    month?: number;
    days: {
      day?: number;
      notes?: string[];
    }[];
  }[]
) {
  return input.map(({ month, days }) => ({
    month,
    days: days.map(({ day, notes }) => ({
      day,
      notes: notes?.join("\n").replace(/^- /, ""),
    })),
  }));
}

function joinDayNotes(
  input: {
    month?: number;
    days: {
      day?: number;
      notes?: string;
    }[];
  }[]
) {
  return input.map(({ month, days }) => ({
    month,
    days: days.map(({ day, notes }) => `${day}: ${notes}`),
  }));
}

function joinDays(
  input: {
    month?: number;
    days: string[];
  }[]
) {
  return input.map(({ month, days }) => ({
    month,
    days: days.join("\n\n"),
  }));
}

function joinMonthDays(
  input: {
    month?: number;
    days: string;
  }[]
) {
  return input.map(
    ({ month, days }) =>
      `${month != null ? `${monthNames[month - 1]} 2023` : ""}${
        days !== "" ? `\n\n${days}` : ""
      }`
  );
}

function joinMonths(months: string[]) {
  return months.join("\n\n\n");
}
