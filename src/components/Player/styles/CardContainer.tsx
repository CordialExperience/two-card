import styled from "styled-components";
import { Card } from "components/Card";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  ${Card} + ${Card} {
    margin-left: 10px;
  }
`;

export default CardContainer;
