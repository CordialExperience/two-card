import React, { useEffect, useMemo, useState } from "react";
import Button from "components/Button";
import Player from "components/Player";
import { PlayerType, PlayersCount, DeckSize } from "types";

import CardGame from "./gameLogic";

export type GameSettings = {
  playersCount?: PlayersCount;
  deckSize?: DeckSize;
};

type GameProps = {
  settings: GameSettings;
};

const Game = ({
  settings: { playersCount = PlayersCount.Two, deckSize = DeckSize.Full },
}: GameProps) => {
  const [playersCards, setPlayersCards] = useState<Record<string, PlayerType>>(
    {}
  );

  const [winner, setWinner] = useState<string[]>([]);

  useEffect(() => {
    setPlayersCards({});
  }, [playersCount, deckSize]);

  const cardGame = useMemo(() => new CardGame({ deckSize }), [deckSize]);
  const playersNames = Array.from(
    Array(playersCount),
    (_, playerNumber) => `player-${playerNumber + 1}`
  );

  const handleStartGame = () => {
    const dealtCards = cardGame.newGame(playersNames);
    setPlayersCards(dealtCards);
    setTimeout(handleWinner, 700);
  };

  const handleWinner = () => {
    const winners = cardGame.getResult();
    if (winners.length === 1) {
      alert(`Winner: ${winner[0]}`);
      setWinner(winner);
      return;
    }

    if (winners.length === playersCount || winners.length === 0) {
      alert("DRAW!");
      return;
    }

    if (playersCount > PlayersCount.Two && winners.length > 1) {
      alert(`${winners.join(" and ")} automatically start new round!`);
      handleDealCards(winners);
      return;
    }
  };

  const handleDealCards = (newRoundPlayers: string[]) => {
    const dealtCards = cardGame.dealCards(newRoundPlayers);
    setPlayersCards((prevDeal) => Object.assign({}, prevDeal, dealtCards));
    setTimeout(handleWinner, 700);
  };

  return (
    <div>
      {playersNames.map((playerName: string) => {
        if (!playersCards[playerName]) {
          return null;
        }

        return (
          <Player
            key={playerName}
            player={playersCards[playerName]}
            winner={winner.includes(playerName)}
          />
        );
      })}

      <Button onClick={handleStartGame}>Deal Cards</Button>
    </div>
  );
};

export default Game;
