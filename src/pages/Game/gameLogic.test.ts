import CardGame from "./gameLogic";
import { DeckSize, CardType } from "types";

describe("GameLogic", () => {
  const players = ["player-1", "player-2", "player-3", "player-4"];

  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  describe("Game for 52 cards", () => {
    const deckSize = DeckSize.Full;
    const cardsPerPlayer = deckSize / players.length;
    const cardGame = new CardGame({ cardsPerPlayer: cardsPerPlayer, deckSize });

    test(`Game should deal ${cardsPerPlayer} cards per player`, () => {
      const newGame = cardGame.newGame(players);

      for (let player of players) {
        expect(newGame[player].cards.length).toBe(cardsPerPlayer);
      }
    });

    test("All dealt cards should be unique", () => {
      const newGame = cardGame.newGame(players);

      const allCards = players.reduce((acc, player) => {
        const playerCards = newGame[player].cards;
        const playerCardsNames = playerCards.map(
          ({ suit, value }) => `${suit}_${value}`
        );

        return [...acc, ...playerCardsNames];
      }, [] as string[]);

      const uniqueCards = new Set(allCards);

      expect(uniqueCards.size).toBe(DeckSize.Full);
    });
  });

  test("36 cards should be in game (without 2, 3, 4 and 5 cards values)", () => {
    const deckSize = DeckSize.Partial;
    const cardsPerPlayer = deckSize / players.length;
    const cardGame = new CardGame({ cardsPerPlayer: cardsPerPlayer, deckSize });
    const newGame = cardGame.newGame(players);

    const allCards = players.reduce((acc, player) => {
      return [...acc, ...newGame[player].cards];
    }, [] as CardType[]);

    expect(allCards.length).toBe(deckSize);

    const hasIncorrectCards = allCards.some(({ value }) =>
      ["2", "3", "4", "5"].includes(value)
    );
    expect(hasIncorrectCards).toBeFalsy();
  });

  test("User pairs", () => {
    const deckSize = DeckSize.Partial;
    const cardGame = new CardGame({ deckSize });
    const activePlayers = players.slice(0, 2);
    const newGame = cardGame.newGame(activePlayers);

    expect(newGame[activePlayers[0]].getPairs()).toEqual({
      10: 2,
      Jack: 1,
    });
  });

  test("Winner", () => {
    const deckSize = DeckSize.Partial;
    const cardGame = new CardGame({ deckSize });
    const activePlayers = players.slice(0, 2);
    cardGame.newGame(activePlayers);

    expect(cardGame.getResult()).toEqual(["player-1"]);
  });

  test("More then one winner", () => {
    const deckSize = DeckSize.Partial;
    const cardGame = new CardGame({ deckSize });
    jest.spyOn(cardGame, "dealCards");
    cardGame.newGame(players);
    expect(cardGame.dealCards).toHaveBeenCalledWith(players);

    const winners = ["player-1", "player-4"];
    expect(cardGame.getResult()).toEqual(winners);
  });
});
