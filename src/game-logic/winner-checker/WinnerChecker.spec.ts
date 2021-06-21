import { Card, CardPair } from "../cards-deck/CardsDeck";
import WinnerChecker from "./WinnerChecker";

describe("Winner Checker", () => {
    test("it should return all pairs from a hand", () => {
        // arrange
        const hand: Card[] = [
            {
                "suit": "hearts",
                "value": "3"
            },
            {
                "suit": "spades",
                "value": "3"
            },
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "diamonds",
                "value": "A"
            },
            {
                "suit": "spades",
                "value": "A"
            },
        ];

        const expectedPairs: CardPair[] = [
            [{
                "suit": "hearts",
                "value": "3"
            },
            {
                "suit": "spades",
                "value": "3"
            }],
            [{
                "suit": "diamonds",
                "value": "A"
            },
            {
                "suit": "spades",
                "value": "A"
            }],
        ];

        // act
        const pairs = WinnerChecker.getPairs(hand);

        // assert
        expect(pairs).toEqual(expectedPairs);
    })

    test("it should return 2 pairs if all suits present for the value", () => {
        // arrange
        const hand: Card[] = [
            {
                "suit": "hearts",
                "value": "3"
            },
            {
                "suit": "spades",
                "value": "3"
            },
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "diamonds",
                "value": "A"
            },
            {
                "suit": "spades",
                "value": "A"
            },
            {
                "suit": "hearts",
                "value": "A"
            },
            {
                "suit": "clubs",
                "value": "A"
            },

        ];

        const expectedPairs: CardPair[] = [
            [{
                "suit": "hearts",
                "value": "3"
            },
            {
                "suit": "spades",
                "value": "3"
            }],
            [{
                "suit": "spades",
                "value": "A"
            },
            {
                "suit": "diamonds",
                "value": "A"
            }],
            [{
                "suit": "hearts",
                "value": "A"
            },
            {
                "suit": "clubs",
                "value": "A"
            }]
        ];

        // act
        const pairs = WinnerChecker.getPairs(hand);

        // assert
        expect(pairs).toEqual(expectedPairs);
    })

    test("it should 0 pairs if no one in a hand", () => {
        // arrange
        const hand: Card[] = [
            {
                "suit": "spades",
                "value": "3"
            },
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "spades",
                "value": "A"
            },

        ];

        const expectedPairs: CardPair[] = [];

        // act
        const pairs = WinnerChecker.getPairs(hand);

        // assert
        expect(pairs).toEqual(expectedPairs);

    })

    test("it should return array with winner hand index with maximum pairs", () => {
        // arrange
        const hand1: Card[] = [
            {
                "suit": "hearts",
                "value": "3"
            },
            {
                "suit": "spades",
                "value": "3"
            },
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "diamonds",
                "value": "A"
            },
            {
                "suit": "spades",
                "value": "A"
            },
        ];

        const hand2: Card[] = [
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "diamonds",
                "value": "A"
            },
            {
                "suit": "spades",
                "value": "A"
            },
        ];

        const hands = [hand1, hand2];

        // act
        const winnerIndexes = WinnerChecker.getWinnerIndexes(hands);

        // assert
        expect(winnerIndexes).toEqual([0]);
    })

    test("it should return empty array if no winner", () => {
        // arrange
        const hand1: Card[] = [
            {
                "suit": "hearts",
                "value": "3"
            },
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "diamonds",
                "value": "A"
            },
        ];

        const hand2: Card[] = [
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "diamonds",
                "value": "A"
            }
        ];

        const hands = [hand1, hand2];

        // act
        const winnerIndexes = WinnerChecker.getWinnerIndexes(hands);

        // assert
        expect(winnerIndexes).toEqual([]);
    })

    test("it should return array with 2 winner indexes when 2 winners", () => {
        // arrange
        const hand1: Card[] = [
            {
                "suit": "hearts",
                "value": "3"
            },
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "spades",
                "value": "A"
            },
        ];

        const hand2: Card[] = [
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "diamonds",
                "value": "A"
            },
            {
                "suit": "spades",
                "value": "A"
            },
        ];

        const hand3: Card[] = [
            {
                "suit": "clubs",
                "value": "K"
            },
            {
                "suit": "diamonds",
                "value": "A"
            },
            {
                "suit": "spades",
                "value": "A"
            },
        ];

        const hands = [hand1, hand2, hand3];
        
        // act
        const winnerIndexes = WinnerChecker.getWinnerIndexes(hands);

        // assert
        expect(winnerIndexes).toEqual([1,2]);
    })
});

export { };