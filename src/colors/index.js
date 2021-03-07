// 3 colors is enough, since we have only 7 cards in a hand.
// If we want to increase the number, we have to add more colors here.
const colors = ["yellow", "blue", "black"];

export function* getNewColor() {
  for (let color of colors) {
    yield color;
  }
}