import { randomWithinRange } from "./identifiers";

type RandomDateParams = {
  yearMin?: number;
  yearMax?: number;
};
export function randomDate({
  yearMin = 1960,
  yearMax = 2000,
}: RandomDateParams): Date {
  const year = Math.round(randomWithinRange(yearMin, yearMax));
  const month = Math.round(randomWithinRange(1, 11));
  const day = Math.round(randomWithinRange(1, 27));
  return new Date(`${year}-${month}-${day}`);
}

export function randomCURP(): string {
  const charCount = 18;
  const charA = 65;
  const charZ = 89;
  const result = [];
  for (let i = 0; i < charCount; i++) {
    const letter = Math.round(randomWithinRange(charA, charZ));
    result.push(String.fromCharCode(letter));
  }
  return result.join("");
}
