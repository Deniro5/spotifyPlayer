import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import { SearchBar } from "./SearchBar";
import { View } from "../../types";
import { HomeSettings } from "./HomeSettings";
import { getCurrentView } from "../../redux/slices/selectors";
import { PlaylistHeader } from "./PlaylistHeader";
import { RecentlyPlayedHeader } from "./RecentlyPlayedHeader";
import { LikedSongsHeader } from "./LikedSongsHeader";

const Header = ({}) => {
  const currentView = useAppSelector(getCurrentView);

  const getHeader = () => {
    switch (currentView) {
      case View.HOME:
        return <HomeSettings />;
      case View.BROWSE:
        return <SearchBar />;
      case View.LIKED_SONGS:
        return <LikedSongsHeader />;
      case View.RECENT_SONGS:
        return <RecentlyPlayedHeader />;
      case View.PLAYLIST:
        return <PlaylistHeader />;
      default:
        return <SearchBar />;
    }
  };

  return <Container>{getHeader()}</Container>;
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

export { Header };
