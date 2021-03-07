import React, { useState, useEffect } from "react";
import { Player, Footer } from "./components";
import {
  getMaxValueIndices,
  dealCards,
  maxHands,
  minHands,
  initialHands,
  cardsPerHand,
} from "./logic";

import "./App.css";

function buildWinnerString(winners, totalHandsNumber) {
  if (winners.length === 1) {
    return `Player ${winners[0] + 1} wins!`;
  } else if (winners.length < totalHandsNumber) {
    return (
      `Players ` + winners.map((i) => i + 1).join(", ") + ` are the winners!`
    );
  } else {
    return `Tie! No winners.`;
  }
}

function App() {
  const [handsNumber, setHandsNumber] = useState(initialHands);
  const [hands, setHands] = useState();

  // Restart the game whenever the user changes the number of hands (players)
  useEffect(play, [handsNumber]);

  function play() {
    setHands(dealCards(handsNumber, cardsPerHand));
  }

  function addHand() {
    setHandsNumber(handsNumber + 1);
  }

  function removeHand() {
    setHandsNumber(handsNumber - 1);
  }

  return (
    <div className="App">
      {hands && (
        <main>
          {/* Might want to have semantically correct ul & li's here, but we'll ignore that for now */}
          {hands.map((hand, i) => (
            <Player key={i} hand={hand} number={i + 1} />
          ))}
          <hr />
          <h2 className="winnerString">
            {buildWinnerString(
              getMaxValueIndices(hands.map((h) => h.pairs)),
              handsNumber
            )}
          </h2>
        </main>
      )}
      <Footer
        addHand={addHand}
        removeHand={removeHand}
        play={play}
        handsNumber={handsNumber}
        maxHands={maxHands}
        minHands={minHands}
      />
    </div>
  );
}

export default App;
