import React from "react";
import styled from "styled-components";
import placeholder from "../../assets/profile.jpeg";
import { View } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentView, setSelectedPlaylistId } from "../../redux/slices/playerSlice";

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
        onClick={() => handleMenuItemClick(View.BROWSE)}
        isActive={currentView === View.BROWSE}>
        <MenuItemIcon src={placeholder} />
        {View.BROWSE}
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuItemClick(View.LIKED_SONGS)}
        isActive={currentView === View.LIKED_SONGS}>
        <MenuItemIcon src={placeholder} />
        {View.LIKED_SONGS}
      </MenuItem>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 35px;
`;

export const MenuItem = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "blue" : "black")};
  transition: 0.1s;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  &:hover {
    color: blue;
  }
  display: flex;
  align-items: center;
  padding: 7px 0px;
`;

const MenuItemIcon = styled.img`
  height: 13px;
  width: 13px;
  margin-right: 8px;
`;

export { Menu };
