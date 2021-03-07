import React from "react";
import Card from "./Card";
import { render, screen } from "@testing-library/react";

describe("components/Card", () => {
  it("renders without crashing", () => {
    render(<Card />);
  });

  it("should render img with proper attributes", async () => {
    render(<Card suit="diamond" value="5" color="azure" />);
    const img = await screen.findByAltText("5 of diamond");
    expect(img.src).toEqual(`http://h3h.net/images/cards/diamond_5.svg`);
    expect(img.style.borderColor).toEqual("azure");
  });
});
