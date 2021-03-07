import React from 'react';

export default function Footer({ addHand, removeHand, play, handsNumber, maxHands, minHands }) {
  return <footer>
    <div>
      <button
        onClick={addHand}
        disabled={handsNumber >= maxHands}
        className="change-hands-number-button"
      >
        Add a hand
      </button>
      <button
        onClick={removeHand}
        disabled={handsNumber <= minHands}
        className="change-hands-number-button"
      >
        Remove a hand
      </button>
    </div>

    <div>
      <button className="play-button" onClick={play}>
        Deal Cards
      </button>
    </div>
  </footer>;
}
