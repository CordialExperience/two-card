import React, { useState, useEffect } from "react";
import "./App.css";
import Player from "./player";
import { getWinners, dealCards } from "./game";

const maxHands = 4;
const minHands = 2;
const initialHands = 2;

// NOTE: If we ever want to increase the number of cards in hand, we'd have to add more colors to the colors array
const cardsPerHand = 7;

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
      <footer>
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
    </div>
  );
}

export default App;
