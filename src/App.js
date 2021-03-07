import React, { useState, Fragment } from "react";
import "./App.css";
import { Deck } from "./deck";
import Hand from "./hand";
import { identifyPairs } from "./handlePairs";

function dealCards(handsNumber, cardsPerHand) {
  const deck = new Deck();
  const hands = [];

  // In real-life games, we draw cards by 1 for each player.
  // We emulate the same process here (might be useful if we want to add animations later)
  for (let cardI = 0; cardI < cardsPerHand; cardI++) {
    for (let handI = 0; handI < handsNumber; handI++) {
      if (hands[handI] === undefined) {
        hands[handI] = { cards: [] };
      }

      hands[handI].cards.push(deck.drawRandomCard());

      // Technically, we could use this same loop to find pairs, and such approach be more performant.
      // But conceptually it might make more sense to decouple the logic and deal the cards first, and only start identifying pairs afterwards.
    }
  }

  return hands;
}

function getWinner(hands) {
  if (hands === undefined) {
    return;
  }

  const scoreMap = new Map();

  for (let i = 0; i < hands.length; i++) {
    const pairs = hands[i].pairs;
    if (!scoreMap.has(pairs)) {
      scoreMap.set(pairs, [i]);
    } else {
      scoreMap.get(pairs).push(i);
    }
  }

  return scoreMap.get(Math.max(...scoreMap.keys()));
}

function App() {
  const [hands, setHands] = useState();

  const handsNumber = 2;
  // NOTE: If we want to increase the number of cards in hand, we'd have to add more colors to the colors array
  const cardsPerHand = 7;

  function play() {
    const hands = dealCards(handsNumber, cardsPerHand);

    for (let hand of hands) {
      const pairs = identifyPairs(hand.cards);
      hand.colors = pairs[0];
      hand.pairs = pairs[1];
    }

    setHands(hands);
  }

  function buildWinnerString(winners) {
    if (winners === undefined) {
      return;
    }

    if (winners.length === 1) {
      return `Player ${winners[0]} wins!`;
    } else if (winners.length < handsNumber) {
      return `Players` + winners.map(i => i + 1).join(', ') + `are the winners!`
    } else {
      return `Tie! No winners.`
    }
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

      <h2 class="winnerString">{buildWinnerString(getWinner(hands))}</h2>

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
