import { colorGenerator, colors } from "./colors";

describe("logic/colorGenerator", () => {
  it("should yield all colors one by one", () => {
    const ar = Array.from(colorGenerator());
    expect(ar).toEqual(colors);
  });

  it("2 different generators should yield colors separately", () => {
      const gen1 = colorGenerator();
      const gen2 = colorGenerator();
    
      expect(gen1.next().value).toEqual(colors[0]);
      expect(gen2.next().value).toEqual(colors[0]);
  });
});
