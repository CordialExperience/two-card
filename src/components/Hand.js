import React from "react";
import Card from "./Card";

import './Hand.css';

export default function Hand({ cards, colors }) {
  // We might want to define the coloring for cards in a more sophisticated way, but it should be fine for now
  return (
    <div className="Hand">
      {cards.map((c, i) => (
        <Card
          key={c[0] + "_" + c[1]}
          suit={c[0]}
          value={c[1]}
          color={colors[i]}
        />
      ))}
    </div>
  );
}
