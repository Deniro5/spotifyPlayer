import React, { useMemo } from "react";
import styled from "styled-components";
import { MillisecondsToMinutesAndSeconds } from "../../utils";
import { Track } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addSelectedTrack, removeSelectedTrack } from "../../redux/slices/playerSlice";
import { COLORS } from "../../constants";
import { ReactComponent as PlayIcon } from "../../assets/play.svg";
import { getSelectedTracksHashLength } from "../../redux/slices/playerSlice";

interface RecommendationResultProps {
  track: Track;
  handleRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
  isSelected: boolean;
  index: number;
}

export const RecommendationResult = ({
  track,
  handleRightClick,
  isSelected,
  index,
}: RecommendationResultProps) => {
  const { seconds, minutes } = MillisecondsToMinutesAndSeconds(track.duration);
  const { uri, artist, title, albumUrl } = track;
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.metaKey) {
      handleToggleSelected();
    }
  };

  const handlePlay = () => {};

  const handleToggleSelected = () => {
    if (isSelected) {
      dispatch(removeSelectedTrack(uri));
    } else {
      dispatch(addSelectedTrack({ trackUri: uri, trackIndex: index }));
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
        <TrackImageContainer>
          <TrackImage src={albumUrl} />
          <HiddenPlayButton onClick={handlePlay}>
            <StyledPlayIcon height={20} width={20} />
          </HiddenPlayButton>
        </TrackImageContainer>
        <TrackTitleAndArtistContainer>
          <TrackTitle isActive={!!playingTrack && playingTrack?.uri === uri}>
            {title}
          </TrackTitle>
          <TrackArtist> {artist} </TrackArtist>
        </TrackTitleAndArtistContainer>
      </ImageAndNameContainer>
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

const CheckboxContainer = styled.div<{ disabled: boolean }>`
  margin-right: 20px;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const TrackTitleAndArtistContainer = styled.div``;

const HiddenPlayButton = styled.div`
  position: absolute;
  top: 0px;
  left: 12px;
  height: 35px;
  width: 35px;
  background: rgba(0, 0, 0, 0.4);
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrackImageContainer = styled.div`
  position: relative;
  &:hover {
    ${HiddenPlayButton} {
      visibility: visible;
    }
  }
`;

const StyledPlayIcon = styled(PlayIcon)`
  margin-left: 2px;
`;
