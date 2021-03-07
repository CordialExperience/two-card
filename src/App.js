import React, { useState, Fragment, useEffect } from "react";
import "./App.css";
import Hand from "./hand";
import { getWinner, dealCards } from "./game";

const maxHands = 4;
const minHands = 2;
const initialHands = 2;

// NOTE: If we ever want to increase the number of cards in hand, we'd have to add more colors to the colors array
const cardsPerHand = 7;

function App() {
  const [handsNumber, setHandsNumber] = useState(initialHands);
  const [hands, setHands] = useState();

  function play() {
    setHands(dealCards(handsNumber, cardsPerHand));
  }

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

  function addHand() {
    setHandsNumber(handsNumber + 1);
  }

  function removeHand() {
    setHandsNumber(handsNumber - 1);
  }

  return (
    <div className="App">
      {hands &&
        hands.map((hand, i) => (
          <Fragment key={hand.cards}>
            <h2>Player {i + 1}:</h2>
            <Hand cards={hand.cards} colors={hand.colors} />
            <br />
            Pairs: {hand.colors.filter((c) => c !== undefined).length / 2}
          </Fragment>
        ))}

      <h2 className="winnerString">{buildWinnerString(getWinner(hands))}</h2>

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
        <button className="play-button" onClick={() => play()}>
          Deal Cards
        </button>
      </div>
    </div>
  );
}

export default App;
