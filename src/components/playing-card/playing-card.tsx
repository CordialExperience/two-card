import { Card } from "../../game-logic/cards-deck/CardsDeck";
import AllCards from "../../assets/playing-cards"

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function (props: Partial<Card>) {
    let CardSvg = AllCards.BackCard;

    if (props.suit && props.value) {
        const cardName = capitalizeFirstLetter(props.suit) + props.value;
        CardSvg = (AllCards as any)[cardName];
    }

    return (
        <div className="playing-card">
            <CardSvg />
        </div>);
}