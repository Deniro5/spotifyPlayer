import React, { useMemo } from "react";
import styled from "styled-components";
import { MillisecondsToMinutesAndSeconds } from "../../utils";
import { Track } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addSelectedTrack,
  getEarliestSelectedTrackIndex,
  removeSelectedTrack,
  setSelectedTracksHash,
} from "../../redux/slices/playerSlice";
import { COLORS } from "../../constants";
import { ReactComponent as PlayIcon } from "../../assets/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause.svg";
import { getSelectedTracksHashLength } from "../../redux/slices/playerSlice";
import PlayingGif from "../../assets/sound.gif";
import useSpotifyApiActions from "../../hooks/useSpotifyApiActions";

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
  const { pause, play } = useSpotifyApiActions();
  const { uri, artist, title, albumUrl } = track;
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);
  const selectedTracksHash = useAppSelector((state) => state.player.selectedTracksHash);
  const selectedTracksHashLength = useAppSelector(getSelectedTracksHashLength);
  const earliestSelectedTrackIndex = useAppSelector(getEarliestSelectedTrackIndex);
  const selectedPlaylistId = useAppSelector((state) => state.player.selectedPlaylistId);
  const currentDisplayTracks = useAppSelector(
    (state) => state.player.currentDisplayTracks
  );
  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.metaKey) {
      handleToggleSelected();
    } else if (e.shiftKey) {
      handleShiftClick();
    } else {
      dispatch(setSelectedTracksHash({ [uri]: index }));
    }
  };

  const handlePlayOrPause = () =>
    playingTrack?.uri === track.uri ? handlePause() : handlePlay();

  const handlePlay = async () => {
    //TODO figure out how to handle 'liked songs' because that isnt a playlist but we still want sequential play
    if (!accessToken) return;
    //if we are on a playlist we want to send the playlist and an offset. If not send the track
    if (selectedPlaylistId) {
      play(index, `spotify:playlist:${selectedPlaylistId}`, undefined);
    } else {
      play(undefined, undefined, track.uri);
    }
  };

  const handlePause = () => {
    pause();
  };

  const handleShiftClick = () => {
    let currentIndex = index;
    //If the track we are clicking on is above all other selected tracks, select all tracks between this one and the earliest selected
    if (earliestSelectedTrackIndex > index) {
      while (currentIndex < earliestSelectedTrackIndex) {
        const currentTrack = currentDisplayTracks[currentIndex];
        dispatch(
          addSelectedTrack({ trackUri: currentTrack.uri, trackIndex: currentIndex })
        );
        currentIndex++;
      }
    }
    //If the track we are clicking on is below a selected track, select all tracks between this one and the one above it in the list (if it exists)
    else {
      while (currentIndex >= 0) {
        const currentTrack = currentDisplayTracks[currentIndex];
        if (selectedTracksHash[currentTrack.uri]) break;
        dispatch(
          addSelectedTrack({ trackUri: currentTrack.uri, trackIndex: currentIndex })
        );
        currentIndex--;
      }
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
      dispatch(addSelectedTrack({ trackUri: uri, trackIndex: index }));
    }
  };

  return (
    <Container
      isSelected={isSelected}
      onClick={handleClick}
      onDoubleClick={handlePlayOrPause}
      onContextMenu={(e) => handleRightClick(e, uri)}
    >
      <ImageAndNameContainer>
        <TrackImageContainer>
          <TrackImage src={albumUrl} />
          {isPlaying && playingTrack?.uri === track.uri && (
            <PlayStatus>
              <img height={50} width={35} src={PlayingGif} alt='' />
            </PlayStatus>
          )}
          <HiddenButton onClick={handlePlayOrPause}>
            {isPlaying && playingTrack?.uri === uri ? (
              <StyledPauseIcon height={18} width={18} />
            ) : (
              <StyledPlayIcon height={20} width={20} />
            )}
          </HiddenButton>
        </TrackImageContainer>

        <TrackTitle isActive={playingTrack?.uri === uri}>{title}</TrackTitle>
      </ImageAndNameContainer>
      <TrackArtist>{artist}</TrackArtist>
      <TrackDuration>{`${minutes}:${seconds} `}</TrackDuration>
      {
        <CheckboxContainer
          disabled={selectedTracksHashLength < 2}
          onClick={handleCheckboxClick}
        >
          <StyledCheckbox type='checkbox' checked={isSelected} />
        </CheckboxContainer>
      }
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

const CheckboxContainer = styled.div<{ disabled: boolean }>`
  margin-right: 20px;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  height: 16px;
  width: 16px;
`;

const StyledPlayIcon = styled(PlayIcon)`
  margin-left: 2px;
`;

const StyledPauseIcon = styled(PauseIcon)``;

const HiddenButton = styled.div`
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
  ${StyledPauseIcon} {
    path {
      fill: white;
    }
  }
`;

// PLAY STATUS AND HIDDEN BUTTON ARE VERY SIMILAR AND SHOULD BE MADE INTO 1

const PlayStatus = styled.div`
  position: absolute;
  top: 0px;
  left: 12px;
  height: 35px;
  width: 35px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  visibility: visible;
`;

const TrackImageContainer = styled.div`
  position: relative;
  &:hover {
    ${HiddenButton} {
      visibility: visible;
    }
    ${PlayStatus} {
      visibility: hidden;
    }
  }
`;
