export function getWinners(hands) {
  if (hands === undefined) {
    return;
  }

  const scoreMap = new Map();

  for (let i = 0; i < hands.length; i++) {
    const pairs = hands[i].pairs;
    if (!scoreMap.has(pairs)) {
      scoreMap.set(pairs, [i]);
    } else {
      scoreMap.get(pairs).push(i);
    }
  }

  return scoreMap.get(Math.max(...scoreMap.keys()));
}
