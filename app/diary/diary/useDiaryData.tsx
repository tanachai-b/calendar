import { useState } from "react";

import { getToday, getDate, randomizedArray } from "../../utils";

export function useDiaryData() {
  const { year, month, day } = getToday();

  const initialDiaryData = [generateDiaryData(year, month, day)];

  const [diaryData, setDiaryData] = useState(initialDiaryData);

  function handleDiaryRequestPrevious() {
    setDiaryData((diaryData) => {
      if (diaryData.length === 0) return diaryData;

      const first = diaryData[0];
      const previousData = generateDiaryData(
        first.year,
        first.month,
        first.day - 1
      );
      return [previousData, ...diaryData];
    });
  }

  function handleDiaryRemovePrevious() {
    setDiaryData((diaryData) => diaryData.slice(1));
  }

  function handleDiaryRequestNext() {
    setDiaryData((diaryData) => {
      if (diaryData.length === 0) return diaryData;

      const last = diaryData[diaryData.length - 1];
      const nextData = generateDiaryData(last.year, last.month, last.day + 1);
      return [...diaryData, nextData];
    });
  }

  function handleDiaryRemoveNext() {
    setDiaryData((diaryData) => diaryData.slice(0, -1));
  }

  function generateDiaryData(year: number, month: number, day: number) {
    const date = getDate(year, month, day);

    return {
      year: date.year,
      month: date.month,
      day: date.day,
      keypoints: randomizedArray({
        array: ["go to office", "have lunch with colleagues", "go to museum"],
        memoizeKey: `${date.year} ${date.month} ${date.day} keypoints`,
        probability: 1 / 14,
      }),
      notes: randomizedArray({
        array: [
          {
            time: "9:00",
            note: "leave home for office \n leave a bit late + traffic jam",
          },
          { time: "10:00", note: "arrive at office" },
          {
            time: "12:00",
            note: "have lunch with colleague at department store \n continue with ice cream",
          },
          {
            time: "15:00",
            note: "leave office early, went to the museum \n have dinner at museum food court",
          },
          { time: "18:00", note: "go home" },
        ],
        memoizeKey: `${date.year} ${date.month} ${date.day} notes`,
        probability: 1 / 14,
      }),
    };
  }

  return {
    initialDiaryData,
    diaryData,
    setDiaryData,
    handleDiaryRequestPrevious,
    handleDiaryRemovePrevious,
    handleDiaryRequestNext,
    handleDiaryRemoveNext,
    generateDiaryData,
  };
}
