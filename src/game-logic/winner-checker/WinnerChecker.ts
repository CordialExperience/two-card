import { Card, CardPair } from "../cards-deck/CardsDeck";

export default class {
    static getWinnerIndexes(hands: Card[][]): number[] {
        const pairsDic: { [k: string]: number } = {};

        hands.forEach((v, i) => pairsDic[i] = this.getPairs(v).length);
        
        const maxPairs = Math.max(...Object.values(pairsDic)) || -1;
        
        const result = Object.keys(pairsDic)
            .filter(x => pairsDic[x] === maxPairs)
            .map(parseFloat);

        return result;
    }
    
    static getPairs(hand: Card[]) {
        let result: CardPair[] = [];
        let valuesCountDic: { [k: string]: number } = {};

        const handValues = hand.map(x => x.value);
        handValues.forEach(k => valuesCountDic[k] ? valuesCountDic[k]++ : (valuesCountDic[k] = 1))

        Object.keys(valuesCountDic).forEach(k => {
            const nRepeatence = valuesCountDic[k];

            if (nRepeatence === 1) {
                return;
            }

            // all suits if 4 repeatens
            if (nRepeatence === 4) {
                result = result.concat([
                    [{ value: k as any, suit: "spades" }, { value: k as any, suit: "diamonds" }],
                    [{ value: k as any, suit: "hearts" }, { value: k as any, suit: "clubs" }]
                ]);
                return;
            }

            // only 2 suits when 3 or 2 repetance
            const valueSuites = hand.filter(x => x.value === k).map(x => x.suit);

            result.push(
                [{ value: k as any, suit: valueSuites[0] }, { value: k as any, suit: valueSuites[1] }]
            )
        });

        return result;
    }

}