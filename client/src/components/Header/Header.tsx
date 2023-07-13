import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import { SearchBar } from "./SearchBar";
import { View } from "../../types";
import { HomeSettings } from "./HomeSettings";
import { getCurrentView } from "../../redux/slices/selectors";

const Header = ({}) => {
  const currentView = useAppSelector(getCurrentView);

  const getHeader = () => {
    switch (currentView) {
      case View.HOME:
        return <HomeSettings />;
      case View.BROWSE:
        return <SearchBar />;
      case View.PLAYLIST:
        return <SearchBar />;
      default:
        return <SearchBar />;
    }
  };

  return <Container>{getHeader()}</Container>;
};

const Container = styled.div`
  padding: 20px;
  width: 100%;
  position: relative;
`;

export { Header };
