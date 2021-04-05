import maxBy from "lodash/maxBy";
import { PlayerType, CardType, DeckSize } from "types";

const suits: readonly string[] = ["diamond", "heart", "club", "spade"];
const values: readonly string[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
  "Ace",
];

type GameConfig = {
  cardsPerPlayer?: number;
  deckSize?: DeckSize;
};

class CardGame {
  private config = { cardsPerPlayer: 7 };
  private playingDeck: CardType[] = [];

  private pairsCount: Record<string, Record<string, number>> = {};
  private players: Record<string, PlayerType> = {};

  constructor({ deckSize = DeckSize.Full, ...rest }: GameConfig = {}) {
    this.config = Object.assign(this.config, rest);

    const offset = deckSize === DeckSize.Partial ? 4 : 0;
    for (let value of values.slice(offset)) {
      for (let suit of suits) {
        this.playingDeck.push({ suit, value });
      }
    }
  }

  private getPairs = (playerName: string) => {
    return this.pairsCount[playerName];
  };

  private countCardPairs = (
    player: string,
    cardValue: string,
    repeatCount: number
  ) => {
    if (repeatCount === 1) {
      return;
    }

    if (this.pairsCount[player] === undefined) {
      this.pairsCount[player] = {};
    }

    this.pairsCount[player][cardValue] = Math.floor(repeatCount / 2);
  };

  newGame = (players: string[]) => {
    this.players = {};
    return this.dealCards(players);
  };

  dealCards = (players: string[]): Record<string, PlayerType> => {
    const { cardsPerPlayer } = this.config;
    this.pairsCount = {};
    const deckCopy = [...this.playingDeck];

    players.forEach((playerName) => {
      const cardRepeatCount: Record<string, number> = {};

      const cards = Array.from(Array(cardsPerPlayer), () => {
        const randomCardIndex = Math.floor(Math.random() * deckCopy.length);
        const [card] = deckCopy.splice(randomCardIndex, 1);

        cardRepeatCount[card.value] = (cardRepeatCount[card.value] || 0) + 1;
        this.countCardPairs(
          playerName,
          card.value,
          cardRepeatCount[card.value]
        );

        return card;
      });

      this.players[playerName] = {
        name: playerName,
        cards: cards,
        getPairs: () => this.getPairs(playerName),
      };
    });

    return this.players;
  };

  getPairsCount = (pairs: Record<string, number>) => {
    return Object.values(pairs).reduce((acc, pairCount) => acc + pairCount, 0);
  };

  getPlayersSortedByPairs = () => {
    return Object.entries(this.pairsCount)
      .map(([playerName, pairs]) => ({
        playerName,
        pairsCount: this.getPairsCount(pairs),
      }))
      .sort((a, b) => b.pairsCount - a.pairsCount);
  };

  getResult = () => {
    const playersSortedByPairs = this.getPlayersSortedByPairs();

    const topOnePlayer = maxBy(playersSortedByPairs, "pairsCount");
    const bestPlayers = playersSortedByPairs.filter(
      ({ pairsCount }) => topOnePlayer?.pairsCount === pairsCount
    );

    if (topOnePlayer?.pairsCount === 0) {
      return [];
    }

    return bestPlayers.map(({ playerName }) => playerName);
  };
}

export default CardGame;
