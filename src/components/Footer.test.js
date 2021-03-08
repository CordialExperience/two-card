import React from "react";
import Footer from "./Footer";
import { render, screen, fireEvent } from "@testing-library/react";

const addHandButtonRx = /Add.+hand/i;
const removeHandButtonRx = /Remove.+hand/i;
const playButtonRx = /Deal.+Cards/i;

describe("components/Footer", () => {
  it("should render", async () => {
    const addHand = jest.fn();
    const removeHand = jest.fn();
    const play = jest.fn();
    render(
      <Footer
        handsNumber="3"
        minHands="3"
        maxHands="8"
        addHand={addHand}
        removeHand={removeHand}
        play={play}
      />
    );
  });

  it("should disable the add button if max hands reached", async () => {
    const addHand = jest.fn();
    const removeHand = jest.fn();
    const play = jest.fn();
    render(
      <Footer
        handsNumber="8"
        minHands="3"
        maxHands="8"
        addHand={addHand}
        removeHand={removeHand}
        play={play}
      />
    );

    expect(screen.getByText(addHandButtonRx).disabled).toEqual(true);
    expect(screen.getByText(removeHandButtonRx).disabled).toEqual(false);
  });

  it("should disable the remove button if min hands reached", async () => {
    const addHand = jest.fn();
    const removeHand = jest.fn();
    const play = jest.fn();
    render(
      <Footer
        handsNumber="3"
        minHands="3"
        maxHands="8"
        addHand={addHand}
        removeHand={removeHand}
        play={play}
      />
    );

    expect(screen.getByText(addHandButtonRx).disabled).toEqual(false);
    expect(screen.getByText(removeHandButtonRx).disabled).toEqual(true);
  });

  it("should call callback on play button click", async () => {
    const addHand = jest.fn();
    const removeHand = jest.fn();
    const play = jest.fn();
    render(
      <Footer
        handsNumber="4"
        minHands="3"
        maxHands="8"
        addHand={addHand}
        removeHand={removeHand}
        play={play}
      />
    );

    fireEvent.click(screen.getByText(playButtonRx));
    expect(play).toHaveBeenCalledTimes(1);
    expect(addHand).not.toHaveBeenCalled();
    expect(removeHand).not.toHaveBeenCalled();
  });

  it("should call callback on add hand button click", async () => {
    const addHand = jest.fn();
    const removeHand = jest.fn();
    const play = jest.fn();
    render(
      <Footer
        handsNumber="4"
        minHands="3"
        maxHands="8"
        addHand={addHand}
        removeHand={removeHand}
        play={play}
      />
    );

    fireEvent.click(screen.getByText(addHandButtonRx));
    expect(play).not.toHaveBeenCalled();
    expect(addHand).toHaveBeenCalledTimes(1);
    expect(removeHand).not.toHaveBeenCalled();
  });

  it("should call callback on remove hand button click", async () => {
    const addHand = jest.fn();
    const removeHand = jest.fn();
    const play = jest.fn();
    render(
      <Footer
        handsNumber="4"
        minHands="3"
        maxHands="8"
        addHand={addHand}
        removeHand={removeHand}
        play={play}
      />
    );

    fireEvent.click(screen.getByText(removeHandButtonRx));
    expect(play).not.toHaveBeenCalled();
    expect(addHand).not.toHaveBeenCalled();
    expect(removeHand).toHaveBeenCalledTimes(1);
  });
});
