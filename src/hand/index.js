import React from "react";
import Card from "../card";

export default function Hand({ cards }) {
  return cards.map((c) => <Card key={c[0]+ '_' + c[1]} suit={c[0]} value={c[1]} />);
}
