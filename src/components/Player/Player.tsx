import React, { useEffect, useMemo, useRef } from "react";
import Card from "components/Card";
import { CardType, PlayerType } from "types";

import CardContainer from "./styles/CardContainer";
import PlayerDesk from "./styles/PlayerDesk";
import PlayerName from "./styles/PlayerName";
import { getRandomColor } from "utils/colors";

type PlayerProps = {
  player: PlayerType;
  winner?: boolean;
};

const Player = ({ player, winner }: PlayerProps) => {
  const pairs = player.getPairs();
  const setPairs = useRef<Record<string, number>>({});

  useEffect(() => {
    setPairs.current = {};
  }, [player]);

  const pairColors = useMemo(() => {
    if (pairs === undefined) {
      return {};
    }

    return Object.entries(pairs).reduce((acc, [cardValue, pairsCount]) => {
      if (pairsCount === 2) {
        acc[`${cardValue}_${pairsCount - 1}`] = getRandomColor();
      }
      acc[`${cardValue}_${pairsCount}`] = getRandomColor();
      return acc;
    }, {} as Record<string, string>);
  }, [pairs]);

  return (
    <PlayerDesk>
      <PlayerName>{player.name}</PlayerName>
      <CardContainer>
        {player?.cards.map((card: CardType) => {
          const pair = pairs?.[card.value];

          if (!setPairs.current[card.value]) {
            setPairs.current[card.value] = 0;
          }

          let color;
          let hasPair = false;
          if (pair !== undefined && pair * 2 > setPairs.current[card.value]) {
            setPairs.current[card.value] += 1;
            color =
              pairColors[
                `${card.value}_${Math.ceil(setPairs.current[card.value] / 2)}`
              ];
            hasPair = true;
          }

          return (
            <Card
              key={`${card.value}_${card.suit}`}
              type={card}
              active={hasPair}
              borderColor={color}
            />
          );
        })}
      </CardContainer>
    </PlayerDesk>
  );
};

export default Player;
