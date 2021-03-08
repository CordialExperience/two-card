import React from "react";
import App from "./App";
import Player from "./components/Player";
import Footer from "./components/Footer";
import { fireEvent, render, screen } from "@testing-library/react";
import * as logic from "./logic";

jest.mock("./components/Player", () => ({ hand, number }) => {
  return <div data-testid="player" data-hand={hand} data-number={number}></div>;
});

jest.mock(
  "./components/Footer",
  () => ({ handsNumber, maxHands, minHands, play, addHand, removeHand }) => {
    return (
      <div
        data-testid="footer"
        data-handsnumber={handsNumber}
        data-minhands={minHands}
        data-maxhands={maxHands}
      >
        <button onClick={play}>play</button>
        <button onClick={addHand}>addHand</button>
        <button onClick={removeHand}>removeHand</button>
      </div>
    );
  }
);

jest.mock("./logic", () => {
  return {
    buildWinnerString: jest.fn(),
    dealCards: jest.fn(),
    getMaxValueIndices: () => {
      return [1];
    },
    initialHands: 3,
    minHands: 1,
    maxHands: 5,
  };
});

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("should render a list of players", async () => {
    const hands1 = ["hand1", "hand2", "hand3"];
    logic.dealCards.mockReturnValueOnce(hands1);
    render(<App />);

    expect(screen.getAllByTestId("player")[0].dataset.hand).toEqual("hand1");
    expect(screen.getAllByTestId("player")[1].dataset.hand).toEqual("hand2");
    expect(screen.getAllByTestId("player")[2].dataset.hand).toEqual("hand3");

    expect(screen.getAllByTestId("player")[0].dataset.number).toEqual("1");
    expect(screen.getAllByTestId("player")[1].dataset.number).toEqual("2");
    expect(screen.getAllByTestId("player")[2].dataset.number).toEqual("3");
  });

  it("should render footer", async () => {
    render(<App />);
    expect(screen.getByTestId("footer").dataset.handsnumber).toEqual("3");
    expect(screen.getByTestId("footer").dataset.minhands).toEqual("1");
    expect(screen.getByTestId("footer").dataset.maxhands).toEqual("5");
  });

  describe("Deal Cards button click", () => {
    it("should deal new cards when Deal Cards button clicked", async () => {
      const hands1 = ["original hand 1", "original hand 2", "original hand 3"];
      const hands2 = ["new hand 1", "new hand 2", "new hand 3"];
      logic.dealCards.mockReturnValueOnce(hands1).mockReturnValueOnce(hands2);

      render(<App />);
      expect(logic.dealCards).toHaveBeenCalledTimes(1);
      expect(screen.getAllByTestId("player")[0].dataset.hand).toEqual(
        "original hand 1"
      );
      expect(screen.getAllByTestId("player")[1].dataset.hand).toEqual(
        "original hand 2"
      );
      expect(screen.getAllByTestId("player")[2].dataset.hand).toEqual(
        "original hand 3"
      );

      fireEvent.click(screen.getByText("play"));
      expect(logic.dealCards).toHaveBeenCalledTimes(2);

      expect(screen.getAllByTestId("player")[0].dataset.hand).toEqual(
        "new hand 1"
      );
      expect(screen.getAllByTestId("player")[1].dataset.hand).toEqual(
        "new hand 2"
      );
      expect(screen.getAllByTestId("player")[2].dataset.hand).toEqual(
        "new hand 3"
      );
    });
  });

  describe("addHand button click", () => {
    it("should deal new cards for increased number of hands", async () => {
      logic.dealCards
        .mockImplementationOnce((handsNumber) => {
          return new Array(handsNumber)
            .fill("original hand")
            .map((v, i) => v + (i + 1));
        })
        .mockImplementationOnce((handsNumber) => {
          return new Array(handsNumber)
            .fill("new hand")
            .map((v, i) => v + (i + 1));
        });

      render(<App />);
      expect(logic.dealCards).toHaveBeenCalledTimes(1);
      expect(screen.getAllByTestId("player").length).toEqual(3);
      expect(screen.getAllByTestId("player")[0].dataset.hand).toEqual(
        "original hand1"
      );
      expect(screen.getAllByTestId("player")[1].dataset.hand).toEqual(
        "original hand2"
      );
      expect(screen.getAllByTestId("player")[2].dataset.hand).toEqual(
        "original hand3"
      );

      fireEvent.click(screen.getByText("addHand"));
      expect(logic.dealCards).toHaveBeenCalledTimes(2);

      expect(screen.getAllByTestId("player").length).toEqual(4);
      expect(screen.getAllByTestId("player")[0].dataset.hand).toEqual(
        "new hand1"
      );
      expect(screen.getAllByTestId("player")[1].dataset.hand).toEqual(
        "new hand2"
      );
      expect(screen.getAllByTestId("player")[2].dataset.hand).toEqual(
        "new hand3"
      );
      expect(screen.getAllByTestId("player")[3].dataset.hand).toEqual(
        "new hand4"
      );
    });
  });

  describe("removeHand button click", () => {
    it("should deal new cards for decreas number of hands", async () => {
      logic.dealCards
        .mockImplementationOnce((handsNumber) => {
          return new Array(handsNumber)
            .fill("original hand")
            .map((v, i) => v + (i + 1));
        })
        .mockImplementationOnce((handsNumber) => {
          return new Array(handsNumber)
            .fill("new hand")
            .map((v, i) => v + (i + 1));
        });

      render(<App />);
      expect(logic.dealCards).toHaveBeenCalledTimes(1);
      expect(screen.getAllByTestId("player").length).toEqual(3);
      expect(screen.getAllByTestId("player")[0].dataset.hand).toEqual(
        "original hand1"
      );
      expect(screen.getAllByTestId("player")[1].dataset.hand).toEqual(
        "original hand2"
      );
      expect(screen.getAllByTestId("player")[2].dataset.hand).toEqual(
        "original hand3"
      );

      fireEvent.click(screen.getByText("removeHand"));
      expect(logic.dealCards).toHaveBeenCalledTimes(2);

      expect(screen.getAllByTestId("player").length).toEqual(2);
      expect(screen.getAllByTestId("player")[0].dataset.hand).toEqual(
        "new hand1"
      );
      expect(screen.getAllByTestId("player")[1].dataset.hand).toEqual(
        "new hand2"
      );
    });
  });
});