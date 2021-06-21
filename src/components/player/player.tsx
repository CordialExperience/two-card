import distinctColors from 'distinct-colors';
import { Card } from "../../game-logic/cards-deck/CardsDeck";
import WinnerChecker from "../../game-logic/winner-checker/WinnerChecker";
import PlayingCard from "../playing-card/playing-card";

function paintPairsInColors(cards: Array<Card>) {
    const pairs = WinnerChecker.getPairs(cards);

    const colorPalete = distinctColors({
        count: pairs.length,
    });

    const coloredPairs = pairs.map((p, i) => p.map(x => ({ ...x, color: colorPalete[i].hex() }))).flat();
    const coloredCards = cards.map(x => {
        const card = coloredPairs.find(y => x.suit === y.suit && x.value === y.value);
        return { ...x, ...card };
    })
    return coloredCards;
}

const Player = (props: { cards: Array<Card>, name: string }) => {
    const { cards, name } = props;
    const coloredCards = paintPairsInColors(cards);

    return (
        <div className="player">
            <h5>{name}</h5>
            <div className="cards">
                {coloredCards.map(x => (
                    <div style={(x.color && { border: `10px solid ${x.color}` }) || {}}>
                        <PlayingCard {...x} />
                    </div>
                ))}
            </div>
        </div>);
}

export default Player;