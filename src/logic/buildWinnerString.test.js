import { buildWinnerString } from "./buildWinnerString";

describe("buildWinnerString", () => {
  describe("all players have equal scores", () => {
    it("should say it's a tie", () => {
      const hands = [{ pairs: 2 }, { pairs: 2 }, { pairs: 2 }];
      expect(buildWinnerString(hands)).toEqual("Tie! No winners.");
    });
  });

  describe("multiple players (but not all) have equal max scores", () => {
    it("should say who are the winners", () => {
      const hands = [{ pairs: 2 }, { pairs: 3 }, { pairs: 3 }];
      expect(buildWinnerString(hands)).toEqual("Players 2, 3 are the winners!");
    });
  });

  describe("single player has a max score", () => {
    it("should say who is the winner", () => {
      const hands = [{ pairs: 2 }, { pairs: 4 }, { pairs: 3 }];
      expect(buildWinnerString(hands)).toEqual("Player 2 wins!");
    });
  });
});
