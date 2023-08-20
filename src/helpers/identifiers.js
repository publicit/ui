import { v4 } from "uuid";

export function randomWithinRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export function uuidV4() {
  return v4();
}
