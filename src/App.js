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

      // Technically, we could use this same loop to find pairs, and such approach be more performant.
      // But conceptually it might make more sense to decouple the logic and deal the cards first, and only start identifying pairs afterwards.
    }
  }

  return res;
}

function App() {
  const [hands, setHands] = useState();

  const handsNumber = 2;
  const cardsPerHand = 7;

  function play() {
    setHands(dealCards(handsNumber, cardsPerHand));
  }

  return (
    <div className="App">
      {hands &&
        hands.map((h,i) => (
          <Fragment key={h}>
            <h2>Player {i + 1}:</h2>
            <Hand cards={h} />
            <br />
          </Fragment>
        ))}

      {/* Might want to deal cards automatically upon app start instead; it was not specified */}
      {hands === undefined && (
        <h2>Please click the "Deal Cards" button to start the game!</h2>
      )}

      <div>
        <button className="play-button" onClick={() => play()}>
          Deal Cards
        </button>
      </div>
    </div>
  );
}

export default App;
