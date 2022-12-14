function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function excludeIndexes<Items>(list: Items[], indexes: number[]): Items[] {
  let result = list.slice();
  for (const index of indexes) {
    result = result.slice(0, index).concat(result.slice(index + 1));
  }
  return result;
}

export function createBucket<T>(variants: T[]) {
  const bucket = new Map<string | number, number[]>();

  function getItem<ID extends string | number>(uid: ID) {
    let cachedIndexes = bucket.get(uid) || [];
    if (cachedIndexes.length >= variants.length) {
      cachedIndexes = [];
    }
    const list = cachedIndexes
      ? excludeIndexes(variants, cachedIndexes)
      : variants;
    const index = randomIntFromInterval(0, list.length - 1);
    bucket.set(uid, [...cachedIndexes, index]);
    return list[index];
  }

  return {
    getItem,
  };
}
