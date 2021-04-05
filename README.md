# About this repo

<p>
Denys Yefremov implementation of test project for Cordial.com
</p>

## About Project

Small card game with simple rules:

1. Game for 2 - 4 players
2. Each player gets 7 cards
3. The winner of the game the player with the biggest amount of pairs
4. If there is more then 2 players in the game and at least 2 players has same amount of pairs, they automatically starts new round
5. The game finish with draw if all players have the same amount of pairs

Time spent: _~10h_

- Setup project (add additional tools to improve workflow): _~2h_
- Implementing game logic: _~4h_
- Implementing UI: _~2h_
- Refactoring and organization code: _~1h_
- Unit-tests: _~1h_

- Writing readme: _~30m_

## Setup & start

To run this project you need to run next commands:

1. yarn install
2. npm start
   or
3. npm run build
4. serve -s build

To run tests, you simply need to run:

- npm run test
  or
- npm run coverage - to see coverage of application

### Features

Settings:

- Select players count
- Select deck size (Partial - 36 or Full - 52)

Game:

- Action to deal cards
- Showing N cards per user (N - can be changed in code by passing this setting to game class)
- Highlight user pairs
- Show winner of the game (simple alert with message of winner/players for the next round)

Project:

- Added prettier to have formatting
- Added typescript
- Prettier runs on each push
- Added editor config
- png images of cards moved to /public/assets to have "real" cards and make game working locally without internet connection

### Possible Improvements

- Move settings to dialog box
- Add ability to change players names
- Improve UI/UX to split visually board
- Add animations on finding pairs/showing winner
- Improve next round behavior to show it visually
- Write unit-tests also for visual parts (right now unit test is provided only for game logic)
- Move winner counting and running next round to game class

### Possible Bugs

- Small shifting of players desks on fast clicking "deal cards"
- Game result shows with small delay, it means that user is able to click button more then once
