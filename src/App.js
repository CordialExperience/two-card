import React from "react";
import "./App.css";
import { Card } from "./card";

import { fullDeck } from "./full-deck";

function App() {
  function drawCards(hands, cardsPerHand) {
    const res = [];

    for (let cardI = 0; cardI < cardsPerHand; cardI++) {
      for (let handI = 0; handI < hands; handI++) {
        if (res[handI] === undefined) {
          res[handI] = [];
        }

        res[handI].push(cardI);
      }
    }

    return res;
  }

  function dealCards() {
    console.log(drawCards(2, 7));
  }

  return (
    <div className="App">
      <h1>Instructions:</h1>
      <p>
        Create a mini game where clicking the button generates several hand
        cards.
        <br />
        Please be sure to fork this repo and update the readme file with your
        notes.
      </p>
      <ul>
        <li>A hand has 7 cards</li>
        <li>
          The winner of the game will be by the amount of pairs a hand has
        </li>
        <li>Each "deal" will create a brand new "game" with new hands</li>
        <li>Display those hands</li>
        <li>
          Mark each hand "pairs" with proper border. Be sure diff pair has diff
          border
        </li>
        <li>Game has two hands by default</li>
        <li>Organized code</li>
      </ul>
      <h5>Extra</h5>
      <ul>
        <li>option to add or remove hands 2-4</li>
        <li>Tests</li>
      </ul>

      <h2>Helpers</h2>
      <div>
        <h4>Example Card:</h4>
        {fullDeck().map((c) => (
          <Card key={c[0] + "_" + c[1]} suit={c[0]} value={c[1]} />
        ))}
      </div>

      <div>
        <h4>Deal Button:</h4>
        <button className="play-button" onClick={dealCards}>
          Deal Cards
        </button>
      </div>
    </div>
  );
}

export default App;
