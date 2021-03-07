export function getMaxValueIndices(handsPairs) {
  if (handsPairs.length === 0) {
    return [];
  }

  const scoreMap = new Map();

  for (let i = 0; i < handsPairs.length; i++) {
    const pairs = handsPairs[i];
    if (!scoreMap.has(pairs)) {
      scoreMap.set(pairs, [i]);
    } else {
      scoreMap.get(pairs).push(i);
    }
  }

  return scoreMap.get(Math.max(...scoreMap.keys()));
}
