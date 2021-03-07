import React from "react";
import Hand from "../hand";

import './player.css'

export default function Player({ hand, number }) {
  return (
    <div className="Player" key={hand.cards}>
      <h2>Player {number}:</h2>
      <Hand cards={hand.cards} colors={hand.colors} />
      <br />
      (Pairs: {hand.colors.filter((c) => c !== undefined).length / 2})
    </div>
  );
}
