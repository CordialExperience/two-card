export type CardType = {
  suit: string;
  value: string;
};

export type PlayerType = {
  name: string;
  cards: CardType[];
  getPairs: () => Record<string, number>;
};

export enum PlayersCount {
  Two = 2,
  Three = 3,
  Four = 4,
}

export enum DeckSize {
  Partial = 36,
  Full = 52,
}
