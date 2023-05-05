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
  const { seconds, minutes } = MillisecondsToMinutesAndSeconds(track.duration);
  const { uri, artist, title, albumUrl } = track;
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const selectedTracksHash = useAppSelector((state) => state.player.selectedTracksHash);
  const currentDisplayTracks = useAppSelector(
    (state) => state.player.currentDisplayTracks
  );
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.metaKey) {
      handleToggleSelected();
    } else if (e.shiftKey) {
      handleShiftClick();
    }
  };

  const handlePlay = () => {
    dispatch(setPlayingTrack(track));
  };

  const handleShiftClick = () => {
    //when shift is held down it should select the track and all tracks before it up until the nearest
    //previous selected track
    let currentIndex = index;
    while (currentIndex >= 0) {
      const currentTrack = currentDisplayTracks[currentIndex];
      if (selectedTracksHash[currentTrack.uri]) break;
      dispatch(addSelectedTrack(currentTrack.uri));
      currentIndex--;
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
    handleToggleSelected();
  };

  const handleToggleSelected = () => {
    if (isSelected) {
      dispatch(removeSelectedTrack(uri));
    } else {
      dispatch(addSelectedTrack(uri));
    }
  };

  return (
    <Container
      isSelected={isSelected}
      onClick={handleClick}
      onDoubleClick={handlePlay}
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
      <CheckboxContainer onClick={handleCheckboxClick}>
        <StyledCheckbox type='checkbox' checked={isSelected} />
      </CheckboxContainer>
    </Container>
  );
};

const TrackTitle = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
  color: ${({ isActive }) => (isActive ? COLORS.primary : COLORS.black)};
`;

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
  color: ${({ isSelected }) => (isSelected ? COLORS.white : COLORS.mediumGrey)};
  &:hover {
    background: ${({ isSelected }) => (isSelected ? COLORS.lightPrimary : COLORS.white)};
  }
  border-radius: 4px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${TrackTitle} {
    color: ${({ isSelected }) => isSelected && COLORS.white};
  }
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

const TrackArtist = styled.div`
  font-size: 14px;
  width: 120px;
`;

const TrackDuration = styled.div`
  font-size: 14px;
`;

const CheckboxContainer = styled.div`
  margin-right: 20px;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  height: 16px;
  width: 16px;
`;
