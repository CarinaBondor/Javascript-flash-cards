// Fisher-Yates shuffle: every ordering is equally likely. Returns a new array.
export function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const currentItem = result[index]!;
    result[index] = result[swapIndex]!;
    result[swapIndex] = currentItem;
  }
  return result;
}
