import CardDealer from "./CardDealer";

describe("Card Dealer", () => {
  test("it should create new shufled card deck after instanciating", () => {
    // arrange
    const cardDealer1 = new CardDealer();
    const cardDealer2 = new CardDealer();

    // act

    // assert
    expect(cardDealer1.cardDeck).not.toEqual(cardDealer2.cardDeck);
  });

  test("it should give n cards to a player", () => {
    // arrange
    const cardDealer = new CardDealer();
    const nCards = 7;

    // act
    const hand = cardDealer.dealCards(nCards);

    // assert
    expect(hand.length).toEqual(nCards);
  });

  test("it should remove given to a player cards from a deck", () => {
    // arrange
    const cardDealer = new CardDealer();
    const initCardDeckLenght = cardDealer.cardDeck.length;
    const nCards = 7;

    // act
    const hand = cardDealer.dealCards(nCards);

    // assert
    expect(cardDealer.cardDeck.length).toEqual(initCardDeckLenght - nCards);
    hand.forEach(card => {
      const foundCard = cardDealer.cardDeck.find(x => x.suit == card.suit && x.value == card.value);
      expect(foundCard).toBeUndefined();
    });
  });

  test("it should not throw when n it's not possible to give n card to a player", () => {
    // arrange
    const cardDealer = new CardDealer();
    const initCardDeckLenght = cardDealer.cardDeck.length;

    // act
    // assert
    expect(() => cardDealer.dealCards(initCardDeckLenght + 1)).not.toThrow();
  });
});

export { };