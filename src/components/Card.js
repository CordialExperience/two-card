import React from "react";
import './Card.css';

export default function Card({ suit, value, color }) {
  return (
    <img
      src={`http://h3h.net/images/cards/${suit}_${value}.svg`}
      alt={`${value} of ${suit}`}
      className="Card"
      style={{ borderColor: color }}
    />
  );
}
