import styled from "styled-components";

const Button = styled.button`
  background-color: #4b1124;
  border: 4px double #cfb338;
  box-shadow: 4px 4px 5px #333;
  color: #eee;
  cursor: pointer;
  font-size: 24px;
  padding: 0.5em 2em;

  &:active {
    position: relative;
    top: 4px;
    left: 4px;
    box-shadow: none;
  }
`;

export default Button;
