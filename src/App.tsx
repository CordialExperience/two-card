import React, { useState } from 'react';
import './App.css';
import Player from './components/player/player';
import CardDealer from './game-logic/card-dealer/CardDealer';
import { Card } from './game-logic/cards-deck/CardsDeck';
import WinnerChecker from './game-logic/winner-checker/WinnerChecker';

let cardDealer: CardDealer;
const nCardsOnHand = 7;

function App() {
  const [hands, setHands] = useState<Card[][]>([]);
  const [playersCount, setPlayersCount] = useState(2);
  const [winnerIndexes, setWinnerIndexes] = useState<number[]>([]);
  const selectOptions = [2, 3, 4];

  const dealCards = (nPlayers: number) => {
    cardDealer = new CardDealer();
    const players = [];
    while (nPlayers--) {
      players.push(cardDealer.dealCards(nCardsOnHand));
    }
    setWinnerIndexes(WinnerChecker.getWinnerIndexes(players));
    setHands(players);
  }

  return (
    <div className="App">
      <div className="controls-wrapper">
        <button className="play-button" onClick={() => dealCards(playersCount)}>
          Deal Cards
        </button>
        <div className="player-selector-wrapper">
          <h3>Players count:</h3>
          <select className="player-selector" onChange={e => setPlayersCount(parseInt(e.target.value))}>
            {selectOptions.map(x => (
              <option value={x}>{x}</option>
            ))}
          </select>
        </div>
      </div>
      {hands.map((h, i) => (
        <div className={winnerIndexes.includes(i) ? "player-winner" : ""}>
          <Player cards={h} name={`Player ${i + 1}`} />
        </div>))}
    </div>
  );
}

export default App;
