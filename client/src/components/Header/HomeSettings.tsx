import React from "react";
import styled from "styled-components";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import { PlaylistSortOptions } from "../../types";
import { setPlaylistSortOption } from "../../redux/slices/playerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export type IHomeSettingsProps = {};

const HomeSettings: React.FC<IHomeSettingsProps> = ({}) => {
  const dispatch = useAppDispatch();
  const playlistSortOption = useAppSelector((state) => state.player.playlistSortOption);

  const onChange = (arg: Option) => {
    dispatch(setPlaylistSortOption(arg.value));
  };

  return (
    <Container>
      <Label> Sort By: </Label>
      <Dropdown
        options={[PlaylistSortOptions.MOST_RECENT, PlaylistSortOptions.ALPHABETICAL]}
        onChange={onChange}
        value={playlistSortOption}
        placeholder='Select an option'
      />
    </Container>
  );
};

const Container = styled.div`
  height: 48px;
  margin-left: 30px;
  display: flex;
  align-items: center;
  .Dropdown-root {
    width: 156px;
  }
`;

const Label = styled.div`
  font-weight: 600;
  margin-right: 10px;
`;

export { HomeSettings };
