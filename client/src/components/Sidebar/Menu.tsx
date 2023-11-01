import React from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as HeartIcon } from "../../assets/heart.svg";
import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import { ReactComponent as RecentIcon } from "../../assets/recently-played.svg";
import { View } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentView, setSelectedPlaylistId } from "../../redux/slices/playerSlice";
import { COLORS } from "../../constants";
import { getCurrentView } from "../../redux/slices/selectors";

const Menu = ({}) => {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector(getCurrentView);

  const handleMenuItemClick = (view: View) => {
    dispatch(setCurrentView(view));
    dispatch(setSelectedPlaylistId(null));
  };

  return (
    <Container>
      <Title> Menu </Title>
      <MenuItem
        onClick={() => handleMenuItemClick(View.HOME)}
        isActive={currentView === View.HOME}
      >
        <IconContainer isActive={currentView === View.HOME} style={{ marginTop: "-3px" }}>
          <HomeIcon height={16} width={16} />
        </IconContainer>
        {View.HOME}
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuItemClick(View.BROWSE)}
        isActive={currentView === View.BROWSE}
      >
        <IconContainer isActive={currentView === View.BROWSE}>
          <SearchIcon height={16} width={16} />
        </IconContainer>
        {View.BROWSE}
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuItemClick(View.LIKED_SONGS)}
        isActive={currentView === View.LIKED_SONGS}
      >
        <IconContainer isActive={currentView === View.LIKED_SONGS}>
          <HeartIcon height={14} width={16} />
        </IconContainer>
        {View.LIKED_SONGS}
      </MenuItem>

      <MenuItem
        onClick={() => handleMenuItemClick(View.RECENT_SONGS)}
        isActive={currentView === View.RECENT_SONGS}
      >
        <IconContainer isActive={currentView === View.RECENT_SONGS}>
          <RecentIcon height={14} width={14} />
        </IconContainer>
        {View.RECENT_SONGS}
      </MenuItem>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 35px;
`;

const IconContainer = styled.div<{ isActive: boolean }>`
  margin-right: 6px;
  transform: translateY(3px);
  path {
    stroke: ${({ isActive }) => isActive && COLORS.white};
    fill: ${({ isActive }) => isActive && COLORS.white};
  }
`;

export const Title = styled.div`
  margin: 0;
  font-weight: 800;
  color: ${COLORS.darkFont};
  font-size: 16px;
  margin-bottom: 16px;
`;

export const MenuItem = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? COLORS.white : COLORS.font)};
  background: ${({ isActive }) => (isActive ? COLORS.primary : "")};
  border-radius: 4px;
  transition: 0.1s;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  &:hover {
    color: ${({ isActive }) => (isActive ? COLORS.white : COLORS.primary)};
    ${IconContainer} {
      path {
        stroke: ${({ isActive }) => (isActive ? COLORS.white : COLORS.primary)};
        fill: ${({ isActive }) => (isActive ? COLORS.white : COLORS.primary)};
      }
    }
  }
  display: flex;
  align-items: center;
  padding: 8px 10px;
`;

export { Menu };
