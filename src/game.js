import { Deck } from "./deck";
import { createColorGenerator } from "./colors";

export function dealCards(handsNumber, cardsPerHand) {
  const deck = new Deck();
  const hands = [];
  const cardsThatExist = [];
  const colorGenerators = [];

  // In real-life games, we draw cards by 1 for each player.
  // We emulate the same process here (might be useful if we want to add something like animations later).
  // A simpler approach would be to simply deal 7 cards to player 0, then deal 7 cards to player 1 etc.
  for (let cardI = 0; cardI < cardsPerHand; cardI++) {
    for (let handI = 0; handI < handsNumber; handI++) {
      if (hands[handI] === undefined) {
        hands[handI] = { cards: [], colors: [], pairs: 0 };
        cardsThatExist[handI] = new Map();
        colorGenerators[handI] = createColorGenerator();
      }

      const hand = hands[handI];

      const newCard = deck.drawRandomCard();
      hand.cards.push(newCard);
      const [, newCardValue] = newCard;

      if (!cardsThatExist[handI].has(newCardValue)) {
        cardsThatExist[handI].set(newCardValue, cardI);
      } else {
        const color = colorGenerators[handI].next().value;
        hand.colors[cardsThatExist[handI].get(newCardValue)] = color;
        hand.colors[cardI] = color;
        hand.pairs++;
        cardsThatExist[handI].delete(newCardValue);
      }

      // Conceptually it might make more sense to decouple the logic and deal the cards first, and only start identifying pairs afterwards.
      // But for this game we may do everything in a single loop
    }
  }

  return hands;
}

export function getWinners(hands) {
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
