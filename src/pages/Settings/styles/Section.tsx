import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: row;

  & + &,
  & > * + * {
    margin-left: 10px;
  }
`;

export default Section;
