import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import SearchBar from "./SearchBar";
import { View } from "../../types";
import HomeHeader from "./HomeHeader";
import { getCurrentView } from "../../redux/selectors";
import PlaylistHeader from "./PlaylistHeader";
import RecentlyPlayedHeader from "./RecentlyPlayedHeader";
import LikedSongsHeader from "./LikedSongsHeader";
import SettingIcon from "../../assets/setting.svg?react";
import { COLORS } from "../../constants";
import SettingsModal from "./SettingsModal";
import { useState } from "react";

const Header = ({}) => {
  const currentView = useAppSelector(getCurrentView);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getHeader = () => {
    switch (currentView) {
      case View.HOME:
        return <HomeHeader />;
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

  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <Container>
      {getHeader()}
      <SettingIconContainer
        onClick={toggleSettingsModal}
        currentView={currentView}
      >
        <SettingIcon height={18} width={18} />
      </SettingIconContainer>
      <SettingsModal
        isOpen={isSettingsOpen}
        handleCloseSettingsModal={toggleSettingsModal}
      />
    </Container>
  );
};

const getIconPadding = (currentView: View) => {
  switch (currentView) {
    case View.HOME:
      return "-8px";
    case View.BROWSE:
      return "0";
    default:
      return "10px";
  }
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: 90px;
`;

const SettingIconContainer = styled.div<{ currentView: View }>`
  cursor: pointer;
  padding-left: 8px;
  &:hover {
    path {
      stroke: ${COLORS.primary};
      fill: ${COLORS.primary};
    }
  }
  margin-top: ${({ currentView }) => getIconPadding(currentView)};
`;

export default Header;
