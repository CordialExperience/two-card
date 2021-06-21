import CardsDeck, { Card } from "../cards-deck/CardsDeck";

export default class CardDealer {
    private _cardDeck: Array<Card> = this.newShufledCardDeck();

    public get cardDeck(): ReadonlyArray<Card> {
        return this._cardDeck;
    }

    public dealCards(nCards: number): Card[] {
       return this._cardDeck.splice(-nCards);
    }

    private newShufledCardDeck() {
        const cardDeck = [...CardsDeck];

        // Durstenfeld shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
        for (let i = cardDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
        }

        return cardDeck;
    }
}