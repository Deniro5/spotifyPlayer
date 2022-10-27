import React, { useState } from "react";
import styled from "styled-components";
import { MillisecondsToMinutesAndSeconds } from "../../utils";
import { Track } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addSelectedTrack,
  removeSelectedTrack,
  setPlayingTrack,
} from "../../redux/slices/playerSlice";
import { COLORS } from "../../constants";

interface TrackSearchResultProps {
  track: Track;
  handleRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
  isSelected: boolean;
  index: number;
}

export const TrackSearchResult = ({
  track,
  handleRightClick,
  isSelected,
  index,
}: TrackSearchResultProps) => {
  console.log(index);
  const { seconds, minutes } = MillisecondsToMinutesAndSeconds(track.duration);
  const { uri, artist, title, albumUrl } = track;
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const dispatch = useAppDispatch();

  const handlePlay = () => {
    dispatch(setPlayingTrack(track));
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
    if (isSelected) {
      dispatch(removeSelectedTrack(uri));
    } else {
      dispatch(addSelectedTrack(uri));
    }
  };

  return (
    <Container
      isSelected={isSelected}
      onClick={handlePlay}
      onContextMenu={(e) => handleRightClick(e, uri)}
    >
      <ImageAndNameContainer>
        <TrackImage src={albumUrl} />
        <TrackTitle isActive={!!playingTrack && playingTrack?.uri === uri}>
          {title}
        </TrackTitle>
      </ImageAndNameContainer>
      <TrackArtist>{artist}</TrackArtist>
      <TrackDuration>{`${minutes}:${seconds} `}</TrackDuration>
      <LikeIconContainer>
        <StyledCheckbox
          type='checkbox'
          checked={isSelected}
          onClick={handleCheckboxClick}
        />
      </LikeIconContainer>
    </Container>
  );
};

const Container = styled.div<{ isSelected: boolean }>`
  background: ${({ isSelected }) => (isSelected ? COLORS.lightPrimary : "#fefefe")};
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 1px auto;
  border: 1px solid whitesmoke;
  &:hover {
    background: ${({ isSelected }) => (isSelected ? COLORS.lightPrimary : "whitesmoke")};
  }
  width: 95%;
  border-radius: 4px;
`;

const ImageAndNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TrackImage = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 3px;
  margin: 0px 12px;
`;

const TrackTitle = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  color: ${({ isActive }) => (isActive ? COLORS.primary : COLORS.black)};
`;

const TrackArtist = styled.div`
  font-size: 14px;
  color: grey;
  width: 120px;
`;

const TrackDuration = styled.div`
  font-size: 14px;
  color: grey;
`;

const LikeIconContainer = styled.div`
  margin-right: 20px;
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  height: 16px;
  width: 16px;
`;
