import React, { ChangeEvent } from "react";
import SettingsContainer from "./styles/SettingsContainer";
import Section from "./styles/Section";
import ContentContainer from "./styles/ContentContainer";

import { GameSettings } from "pages/Game";

import { PlayersCount, DeckSize } from "types";

type SettingsProps = {
  initialGameSettings: GameSettings;
  changeGameSettings: (gameSettings: GameSettings) => void;
};

const Settings = ({
  initialGameSettings,
  changeGameSettings,
}: SettingsProps) => {
  const handleChangeSettings = (settingsType: keyof GameSettings) => (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const settingValue = +e.target.value;
    changeGameSettings({
      [settingsType]: settingValue,
    });
  };

  return (
    <ContentContainer>
      <h2>Settings</h2>
      <SettingsContainer>
        <Section>
          <label>Players count:</label>
          <select
            value={initialGameSettings.playersCount}
            onChange={handleChangeSettings("playersCount")}
          >
            <option value={PlayersCount.Two}>2</option>
            <option value={PlayersCount.Three}>3</option>
            <option value={PlayersCount.Four}>4</option>
          </select>
        </Section>
        <Section>
          <label>Deck size:</label>
          <select
            value={initialGameSettings.deckSize}
            onChange={handleChangeSettings("deckSize")}
          >
            <option value={DeckSize.Partial}>36</option>
            <option value={DeckSize.Full}>52</option>
          </select>
        </Section>
      </SettingsContainer>
    </ContentContainer>
  );
};

export default Settings;
