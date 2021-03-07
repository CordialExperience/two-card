import { Deck } from "./deck";
import { getNewColor } from "./colors";

// export function identifyPairs(hand) {
//   const map = new Map();
//   const colors = getNewColor();
//   const assignedColors = [];
//   let pairs = 0;

//   for (let [i, [, value]] of hand.entries()) {
//     if (!map.has(value)) {
//       map.set(value, i);
//     } else {
//       const color = colors.next().value;
//       assignedColors[map.get(value)] = color;
//       assignedColors[i] = color;
//       pairs++;
//       map.delete(value);
//     }
//   }

//   return [assignedColors, pairs];
// }

export function dealCards(handsNumber, cardsPerHand) {
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

  // TODO!!!!!!!!
  for (let hand of hands) {
    const map = new Map();
    const colors = getNewColor();
    const assignedColors = [];
    let pairs = 0;

    for (let [i, [, value]] of hand.cards.entries()) {
      if (!map.has(value)) {
        map.set(value, i);
      } else {
        const color = colors.next().value;
        assignedColors[map.get(value)] = color;
        assignedColors[i] = color;
        pairs++;
        map.delete(value);
      }
    }

    hand.colors = assignedColors;
    hand.pairs = pairs;
  }

  return hands;
}

export function getWinner(hands) {
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
