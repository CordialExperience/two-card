import React from "react";
import Hand from "./Hand";
import Card from "./Card";
import { queryAllByTestId, render } from "@testing-library/react";

jest.mock("./Card", () => ({ suit, value, color }) => {
  return (
    <div
      data-testid="card"
      data-suit={suit}
      data-value={value}
      data-color={color}
    ></div>
  );
});

describe("components/Hand", () => {
  it("should render a list of cards", async () => {
    const cards = [
      ["diamond", "4"],
      ["spades", "K"],
    ];
    const colors = [];
    colors[1] = "black";
    render(<Hand cards={cards} colors={colors} />);
    const renderedCards = queryAllByTestId(document, "card");
    expect(renderedCards.length).toEqual(2);

    expect(renderedCards[0].dataset.suit).toEqual("diamond");
    expect(renderedCards[0].dataset.value).toEqual("4");
    expect(renderedCards[0].dataset.color).toEqual(undefined);

    expect(renderedCards[1].dataset.suit).toEqual("spades");
    expect(renderedCards[1].dataset.value).toEqual("K");
    expect(renderedCards[1].dataset.color).toEqual("black");
  });
});
