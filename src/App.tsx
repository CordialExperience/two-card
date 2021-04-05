import React, { useState } from "react";

import Game, { GameSettings } from "pages/Game";
import Settings from "pages/Settings";
import { DeckSize, PlayersCount } from "types";

function App() {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    playersCount: PlayersCount.Two,
    deckSize: DeckSize.Full,
  });

  const handleChangeSettings = (updatedSettings: GameSettings) => {
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      ...updatedSettings,
    }));
  };

  return (
    <div className="App">
      <Settings
        initialGameSettings={gameSettings}
        changeGameSettings={handleChangeSettings}
      />
      <Game settings={gameSettings} />
    </div>
  );
}

export default App;
