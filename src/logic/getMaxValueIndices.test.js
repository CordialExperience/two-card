import { getMaxValueIndices } from "./getMaxValueIndices";

describe("logic/getMaxValueIndices", () => {
  describe("in case of duplicate max value", () => {
    it("should return indices of the array's max value occurences", () => {
      expect(getMaxValueIndices([6, 2, 34, 3, 7, 2, 57, 3, 57])).toEqual([
        6,
        8,
      ]);
    });
  });

  describe("in case of all equal values", () => {
    it("should return indices of the array's max value occurences", () => {
      expect(getMaxValueIndices([6, 6, 6, 6, 6, 6, 6, 6, 6])).toEqual([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
      ]);
    });
  });

  describe("in case of a single-value array", () => {
    it("should return [0]", () => {
      expect(getMaxValueIndices([2])).toEqual([0]);
    });
  });

  describe("in case of an empty array", () => {
    it("should return an empty array", () => {
      expect(getMaxValueIndices([])).toEqual([]);
    });
  });
});
