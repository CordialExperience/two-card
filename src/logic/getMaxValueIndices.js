export function getMaxValueIndices(values) {
  if (values.length === 0) {
    return [];
  }

  const scoreMap = new Map();

  for (let i = 0; i < values.length; i++) {
    const pairs = values[i];
    if (!scoreMap.has(pairs)) {
      scoreMap.set(pairs, [i]);
    } else {
      scoreMap.get(pairs).push(i);
    }
  }

  return scoreMap.get(Math.max(...scoreMap.keys()));
}
