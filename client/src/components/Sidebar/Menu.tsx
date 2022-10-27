import React from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as HeartIcon } from "../../assets/heart.svg";
import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import { View } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentView, setSelectedPlaylistId } from "../../redux/slices/playerSlice";
import { COLORS } from "../../constants";

const Menu = ({}) => {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector((state) => state.player.currentView);

  const handleMenuItemClick = (view: View) => {
    dispatch(setCurrentView(view));
    dispatch(setSelectedPlaylistId(null));
  };

  return (
    <Container>
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
    stroke: ${({ isActive }) => isActive && COLORS.primary};
    fill: ${({ isActive }) => isActive && COLORS.primary};
  }
`;

export const MenuItem = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? COLORS.primary : "black")};
  transition: 0.1s;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  &:hover {
    color: ${COLORS.primary};
    ${IconContainer} {
      path {
        stroke: ${COLORS.primary};
        fill: ${COLORS.primary};
      }
    }
  }
  display: flex;
  align-items: center;
  padding: 7px 0px;
`;

export { Menu };
