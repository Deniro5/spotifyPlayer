import React from "react";
import styled from "styled-components";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import { PlaylistSortOptions } from "../../types";
import { setPlaylistSortOption } from "../../redux/slices/playerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getPlaylistSortOption } from "../../redux/slices/selectors";

export type IHomeSettingsProps = {};

const HomeHeader: React.FC<IHomeSettingsProps> = ({}) => {
  const dispatch = useAppDispatch();
  const playlistSortOption = useAppSelector(getPlaylistSortOption);

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
  padding-top: 20px;
  padding-bottom: 34px;
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

export { HomeHeader };
