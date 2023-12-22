const randomMemo = new Map<string, number>();

export function memoizedRandom(key: string) {
  const value = randomMemo.get(key);
  if (value != null) return value;

  const random = Math.random();
  randomMemo.set(key, random);
  return random;
}

export function randomizedArray<T>({
  array,
  memoizeKey,
  probability,
}: {
  array: T[];
  memoizeKey: string;
  probability: number;
}) {
  return array.reduce<T[]>((prev, curr, index) => {
    return [
      ...prev,
      ...(memoizedRandom(`${memoizeKey} ${index}`) < probability ? [curr] : []),
    ];
  }, []);
}

export function isToday(year: number, month: number, day: number) {
  const date = new Date(year, month - 1, day);
  const today = new Date();

  return today.toDateString() === date.toDateString();
}

export function isCurrentMonth(year: number, month: number) {
  const date = new Date(year, month - 1, 1);
  const today = new Date();
  today.setDate(1);

  return today.toDateString() === date.toDateString();
}

export function getWeekday(year: number, month: number, day: number): number {
  return new Date(year, month - 1, day).getDay();
}
