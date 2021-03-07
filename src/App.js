import React, { useState, Fragment } from "react";
import "./App.css";
import { Deck } from "./deck";
import Hand from "./hand";

function dealCards(hands, cardsPerHand) {
  const deck = new Deck();
  const res = [];

  // In real-life games, we draw cards by 1 for each player.
  // We emulate the same process here (might be useful if we want to add animations later)
  for (let cardI = 0; cardI < cardsPerHand; cardI++) {
    for (let handI = 0; handI < hands; handI++) {
      if (res[handI] === undefined) {
        res[handI] = [];
      }

      res[handI].push(deck.drawRandomCard());
    }
  }

  return res;
}

function App() {
  const [hands, setHands] = useState([]);

  const handsNumber = 2;
  const cardsPerHand = 7

  function play() {
    setHands(dealCards(handsNumber, cardsPerHand));
  }

  return (
    <div className="App">
      {hands.map((h) => (
        <Fragment key={h}>
          <Hand cards={h} />
          <br />
        </Fragment>
      ))}

      <div>
        <h4>Deal Button:</h4>
        <button className="play-button" onClick={() => play()}>
          Deal Cards
        </button>
      </div>
    </div>
  );
}

export default App;
