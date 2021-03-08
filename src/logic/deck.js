const suits = ["spade", "heart", "diamond", "club"];

const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

function fullDeck() {
  const res = [];

  for (let suit of suits) {
    for (let v of values) {
      res.push([suit, v]);
    }
  }

  return res;
}

export default class Deck {
  constructor() {
    this.cards = fullDeck();
  }

  /**
   * Draws random card from the remaining cards in the deck.
   * @returns Card in format [suit, value]
   */
  drawRandomCard() {
    // FWIW This could be converted to a generator as well.
    if (this.cards.length === 0) {
      return undefined;
    }
    
    const i = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(i, 1)[0];
  }
}