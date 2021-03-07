import React, { useState, useEffect } from "react";
import "./App.css";
import Player from "./player";
import { getWinners, dealCards, maxHands, minHands, initialHands, cardsPerHand } from "./game";
import Footer from "./footer";

function App() {
  const [handsNumber, setHandsNumber] = useState(initialHands);
  const [hands, setHands] = useState();

  // Restart the game whenever the user changes the number of hands (players)
  useEffect(play, [handsNumber]);

  function buildWinnerString(winners) {
    if (winners === undefined) {
      return;
    }

    if (winners.length === 1) {
      return `Player ${winners[0] + 1} wins!`;
    } else if (winners.length < handsNumber) {
      return (
        `Players ` + winners.map((i) => i + 1).join(", ") + ` are the winners!`
      );
    } else {
      return `Tie! No winners.`;
    }
  }

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
      <main>
        {/* Might want to have semantically correct ul & li's here, but we'll ignore that for now */}
        {hands &&
          hands.map((hand, i) => <Player key={i} hand={hand} number={i + 1} />)}

        <hr />
        <h2 className="winnerString">{buildWinnerString(getWinners(hands))}</h2>
      </main>
        <Footer addHand={addHand} removeHand={removeHand} play={play} handsNumber={handsNumber} maxHands={maxHands} minHands={minHands} />
    </div>
  );
}

export default App;
