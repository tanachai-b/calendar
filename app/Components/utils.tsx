export function isCurrentMonth(year: number, month: number) {
  const date = new Date(year, month - 1, 1);
  const today = new Date();
  today.setDate(1);

  return today.toDateString() === date.toDateString();
}

export function isToday(year: number, month: number, day: number) {
  const date = new Date(year, month - 1, day);
  const today = new Date();

  return today.toDateString() === date.toDateString();
}

export function getWeekdayName(
  year: number,
  month: number,
  day: number
): number {
  return new Date(year, month - 1, day).getDay();
}
