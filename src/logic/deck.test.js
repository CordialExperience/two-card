import Deck from "./deck";

describe("logic/Deck", () => {
  it("should only return 52 unique cards", () => {
    const deck = new Deck();
    const cardsInDeck = 52;

    function hash(card) {
      return card[1] + " of " + card[0];
    }

    const drawnCards = new Set();

    for (let i = 1; i <= cardsInDeck; i++) {
      const card = deck.drawRandomCard();

      if (drawnCards.has(hash(card))) {
        throw new Error(
          `The ${hash(card)} has been drawn twice from the same deck`
        );
      }

      drawnCards.add(hash(card));
    }

    expect(deck.drawRandomCard()).toBeUndefined();
    expect(drawnCards.size).toEqual(cardsInDeck);
  });
});
