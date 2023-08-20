import { DateTime } from "luxon";

export function fromISODate(isoDate: string) {
  return DateTime.fromISO(isoDate).endOf("day").plus({ second: 1 }).toJSDate();
}

// dateToDateObject converts a YYYY-MM-DD date as string into a date object
export function dateToDateObject(date: string) {
  return new Date(`${date}T00:00`);
}

export function dateToDateForm(date: Date) {
  return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
}

export function diffNowYears(date: Date): number {
  return DateTime.fromJSDate(date).diffNow("years").years;
}
