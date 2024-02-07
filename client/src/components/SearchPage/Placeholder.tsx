import styled from "styled-components";
import SearchIcon from "../../assets/search.svg?react";
import { COLORS } from "../../constants";

const Placeholder = () => {
  return (
    <Container>
      <SearchIcon height={48} width={48} />
      <Text> Enter a search term above to get started</Text>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  line-height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px;
  width: 100%;
  text-align: center;
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 16px;
`;

export default Placeholder;
