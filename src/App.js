import React, { useState, useEffect } from "react";
import { Player, Footer } from "./components";
import {
  dealCards,
  maxHands,
  minHands,
  initialHands,
  cardsPerHand,
  buildWinnerString
} from "./logic";

import "./App.css";

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
            {buildWinnerString(hands)}
          </h2>
        </main>
      )}
      <Footer
        handsNumber={handsNumber}
        minHands={minHands}
        maxHands={maxHands}
        addHand={addHand}
        removeHand={removeHand}
        play={play}
      />
    </div>
  );
}

export default App;
