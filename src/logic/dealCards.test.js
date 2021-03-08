import { dealCards } from "./dealCards";
import Deck from "./deck";
import { colorGenerator } from "./colors";

jest.mock("./deck");
jest.mock("./colors");

beforeEach(() => {
  const cards = [
    ["spade", 2],
    ["diamond", 2],
    ["club", 2],
    ["heart", 2],
    ["spade", 3],
    ["diamond", 3],
    ["club", 3],
    ["heart", 3],
    ["spade", 4],
    ["diamond", 4],
    ["club", 4],
    ["heart", 4],
    ["spade", 5],
    ["diamond", 5],
    ["club", 5],
    ["heart", 5],
    ["spade", 6],
    ["diamond", 6],
    ["club", 6],
    ["heart", 6],
    ["spade", 7],
    ["diamond", 7],
    ["club", 7],
    ["heart", 7],
    ["spade", 8],
    ["diamond", 8],
    ["club", 8],
    ["heart", 8],
    ["spade", 9],
    ["diamond", 9],
    ["club", 9],
    ["heart", 9],
  ];
  let i = -1;

  Deck.mockImplementation(() => {
    return {
      drawRandomCard() {
        i++;
        return cards[i];
      },
    };
  });

  const colors = ["first", "second", "third", "fourth", "fifth"];
  function* colorsGenerator() {
    for (let color of colors) {
      yield color;
    }
  };

  colorGenerator.mockImplementation(colorsGenerator);
});

describe("logic/dealCards", () => {
  it("should deal a proper number of cards to every hand", () => {
    const handsNumber = 8;
    const cardsPerHand = 4;

    const hands = dealCards(handsNumber, cardsPerHand);

    expect(hands.length).toEqual(handsNumber);

    for (let i = 0; i < handsNumber; i++) {
      expect(hands[i].cards.length).toEqual(cardsPerHand);
    }
  });

  it("should properly identify pairs within each hand", () => {
    const handsNumber = 2;
    const cardsPerHand = 4;

    const hands = dealCards(handsNumber, cardsPerHand);

    expect(hands[0].pairs).toEqual(2);
    expect(hands[0].colors).toEqual(["first", "first", "second", "second"]);

    expect(hands[1].pairs).toEqual(2);
    expect(hands[1].colors).toEqual(["first", "first", "second", "second"]);
  });
});
