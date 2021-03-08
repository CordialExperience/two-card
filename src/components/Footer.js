import React from "react";
import "./Footer.css";

export default function Footer({
  handsNumber,
  minHands,
  maxHands,
  addHand,
  removeHand,
  play,
}) {
  return (
    <footer className="Footer">
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
    </footer>
  );
}
