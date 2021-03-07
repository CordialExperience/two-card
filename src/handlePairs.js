import { getNewColor } from "./colors";

export function identifyPairs(hand) {
  const map = new Map();
  const colors = getNewColor();
  const assignedColors = [];
  let pairs = 0;

  for (let [i, [, value]] of hand.entries()) {
    if (!map.has(value)) {
      map.set(value, i);
    } else {
      const color = colors.next().value;
      assignedColors[map.get(value)] = color;
      assignedColors[i] = color;
      pairs++;
      map.delete(value);
    }
  }

  return [assignedColors, pairs];
}
