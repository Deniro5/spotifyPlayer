import React from "react";
import styled from "styled-components";
import { SearchBar } from "./SearchBar";

const Header = ({}) => {
  return (
    <Container>
      <SearchBar />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

export { Header };
