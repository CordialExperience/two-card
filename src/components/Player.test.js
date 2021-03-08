import React from "react";
import Hand from "./Hand";
import Player from "./Player";
import { render, screen } from "@testing-library/react";

jest.mock("./Hand", () => ({ cards, colors }) => {
  return <div data-testid="hand" data-cards={cards} data-colors={colors}></div>;
});

describe("components/Player", () => {
  it("should render a list of cards", async () => {
    const cards = [
      ["diamond", "4"],
      ["spades", "K"],
      ["spades", "J"],
    ];
    const colors = [];
    colors[1] = "black";
    colors[2] = "black";

    render(<Player hand={{ cards, colors, pairs: 1 }} number="67" />);

    expect(screen.getByText(/Player (\d+)/).textContent.match(/Player (\d+)/)[1]).toEqual('67');
    expect(screen.getByText(/Pairs: (\d+)/).textContent.match(/Pairs: (\d+)/)[1]).toEqual('1');
    expect(screen.getByTestId('hand').dataset.cards).toEqual(cards.flat().join());
    expect(screen.getByTestId('hand').dataset.colors).toEqual(colors.join());
  });
});
