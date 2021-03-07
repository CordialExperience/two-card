import React from "react";
import Card from "../card";
import { getNewColor } from "../colors";

function identifyPairs(hand) {
  const map = new Map();
  const colors = getNewColor();
  const assignedColors = [];

  for (let [i, [, value]] of hand.entries()) {
    if (!map.has(value)) {
      map.set(value, i);
    } else {
      const color = colors.next().value;
      assignedColors[map.get(value)] = color;
      assignedColors[i] = color;
      map.delete(value);
    }
  }

  return assignedColors;
}

export default function Hand({ cards }) {
  const colors = identifyPairs(cards);

  // We might want to define the coloring for cards in a more sophisticated way, but it should be fine for now
  return cards.map((c, i) => (
    <Card key={c[0] + "_" + c[1]} suit={c[0]} value={c[1]} color={colors[i]} />
  ));
}
