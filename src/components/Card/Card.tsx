import styled, { css } from "styled-components";
import { CardType } from "types";

type CardProps = {
  borderColor?: string;
  type: CardType;
  active?: boolean;
};

export const Card = styled.div<CardProps>`
  width: 7rem;
  border: 1px solid;
  border-color: ${({ borderColor = "#000" }) => borderColor};
  border-radius: 9px;
  font-size: 0;

  ${({ active = false }) =>
    active
      ? css`
          position: relative;
          border-width: 3px;
          top: -10px;
        `
      : ""}
`;

const CardImage = (props: CardProps) => {
  const { type } = props;
  return (
    <Card {...props}>
      <img
        width="100%"
        src={`/assets/${type.value}_${type.suit}.png`}
        alt={`${type.value} of ${type.suit}`}
      />
    </Card>
  );
};

export default CardImage;
