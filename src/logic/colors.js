// 3 colors is enough, since we have only 7 cards in a hand.
// If we want to increase the number, we have to add more colors here.
const colors = ["yellow", "blue", "black"];

// We might want to define the coloring for cards in a more sophisticated way, but it should be fine for now
export function* createColorGenerator() {
  for (let color of colors) {
    yield color;
  }
}
