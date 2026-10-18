import { shuffled } from "./shuffle";

describe("shuffled", () => {
  it("returns a new array with the same items", () => {
    const items = [1, 2, 3, 4, 5];
    const result = shuffled(items);

    expect(result).not.toBe(items);
    expect([...result].sort()).toEqual(items);
  });

  it("does not change the original array", () => {
    const items = [1, 2, 3];
    shuffled(items);
    expect(items).toEqual([1, 2, 3]);
  });

  it("handles empty and single-item arrays", () => {
    expect(shuffled([])).toEqual([]);
    expect(shuffled(["only"])).toEqual(["only"]);
  });
});
