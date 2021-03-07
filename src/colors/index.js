const colors = ["yellow", "blue", "black"];

export function* getNewColor() {
  for (let color of colors) {
    yield color;
  }
}