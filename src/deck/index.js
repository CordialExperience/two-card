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

export class Deck {
  constructor() {
    this.cards = fullDeck();
  }

  drawRandomCard() {
    // TODO handle if deck is empty
    const i = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(i, 1)[0];
  }
}