import React from "react";

export default function Card({ suit, value }) {
  return (
    <img
      src={`http://h3h.net/images/cards/${suit}_${value}.svg`}
      alt={`${value} of ${suit}`}
      className="card"
    />
  );
}
