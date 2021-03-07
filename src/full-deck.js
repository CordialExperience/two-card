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

export function fullDeck() {
  const res = [];

  for (let suit of suits) {
    for (let v of values) {
      res.push([suit, v]);
    }
  }

  return res;
}
