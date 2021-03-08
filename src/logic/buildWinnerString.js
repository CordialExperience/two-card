import { getMaxValueIndices } from "./getMaxValueIndices";

export function buildWinnerString(hands) {
  const winners = getMaxValueIndices(hands.map((h) => h.pairs));

  if (winners.length === 1) {
    return `Player ${winners[0] + 1} wins!`;
  } else if (winners.length < hands.length) {
    return (
      `Players ` + winners.map((i) => i + 1).join(", ") + ` are the winners!`
    );
  } else {
    return `Tie! No winners.`;
  }
}
