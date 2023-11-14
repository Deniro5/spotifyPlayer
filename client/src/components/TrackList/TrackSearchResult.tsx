import React, { useMemo } from "react";
import styled from "styled-components";
import { MillisecondsToMinutesAndSeconds } from "../../utils";
import { Track, View } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addSelectedTrack,
  removeSelectedTrack,
  setSelectedTracksHash,
} from "../../redux/slices/playerSlice";
import { COLORS } from "../../constants";
import useSpotifyApiActions from "../../hooks/useSpotifyApiActions";
import { TrackTitleArtistAndImage } from "./TrackResultComponents/TrackTitleArtistAndImage";
import { TrackTitle } from "./TrackResultComponents/TrackTitleArtistAndImage";
import {
  getAccessToken,
  getCurrentDisplayTracks,
  getEarliestSelectedTrackIndex,
  getPlayingTrack,
  getSelectedPlaylistId,
  getSelectedTracksHash,
  getSelectedTracksHashLength,
  getSongsStatusHash,
  getCurrentView,
} from "../../redux/slices/selectors";
import { ReactComponent as HeartIcon } from "../../assets/heart.svg";
import { uriToId } from "../../utils";

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
  const { seconds, minutes } = MillisecondsToMinutesAndSeconds(track.duration_ms);
  const { pause, play, addLikedSongs, removeLikedSongs } = useSpotifyApiActions();
  const { uri, albumName } = track;
  const accessToken = useAppSelector(getAccessToken);
  const currentView = useAppSelector(getCurrentView);
  const playingTrack = useAppSelector(getPlayingTrack);
  const selectedTracksHash = useAppSelector(getSelectedTracksHash);
  const selectedTracksHashLength = useAppSelector(getSelectedTracksHashLength);
  const earliestSelectedTrackIndex = useAppSelector(getEarliestSelectedTrackIndex);
  const selectedPlaylistId = useAppSelector(getSelectedPlaylistId);
  const currentDisplayTracks = useAppSelector(getCurrentDisplayTracks);
  const songsStatusHash = useAppSelector(getSongsStatusHash);
  const dispatch = useAppDispatch();
  const isSaved = useMemo(
    () => songsStatusHash[uriToId(track.uri)],
    [track, songsStatusHash]
  );

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

  const handleSavedStatusClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isSaved) {
      removeLikedSongs([uri], currentView === View.LIKED_SONGS);
    } else {
      addLikedSongs([uri], currentView === View.LIKED_SONGS);
    }
  };

  return (
    <OuterContainer>
      <Container
        isSelected={isSelected}
        isFirst={index === 0}
        onClick={handleClick}
        onDoubleClick={handlePlayOrPause}
        onContextMenu={(e) => handleRightClick(e, uri)}
      >
        <TrackTitleArtistAndImage track={track} handlePlayOrPause={handlePlayOrPause} />
        <TrackAlbum>{albumName}</TrackAlbum>
        <TrackDuration>{`${minutes}:${seconds} `}</TrackDuration>
        <RightColumn>
          {selectedTracksHashLength < 2 ? (
            <SavedStatusContainer
              onClick={handleSavedStatusClick}
              isSaved={
                songsStatusHash[uriToId(track.uri)] || currentView === View.LIKED_SONGS
              }
              isSelected={isSelected}
            >
              <HeartIcon height={14} width={16} />
            </SavedStatusContainer>
          ) : (
            <CheckboxContainer onClick={handleCheckboxClick}>
              <StyledCheckbox type='checkbox' checked={isSelected} readOnly />
            </CheckboxContainer>
          )}
        </RightColumn>
      </Container>
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  position: relative;
`;

const Container = styled.div<{ isSelected: boolean; isFirst: boolean }>`
  background: ${({ isSelected }) =>
    isSelected ? COLORS.primary : COLORS.trackBackground};
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 1px auto;
  margin-top: ${({ isFirst }) => isFirst && "-1px"};
  border: 1px solid ${COLORS.whitesmoke};
  color: ${({ isSelected }) => (isSelected ? COLORS.white : COLORS.lightFont)};
  &:hover {
    background: ${({ isSelected }) => (isSelected ? COLORS.primary : COLORS.whitesmoke)};
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

const TrackDuration = styled.div`
  font-size: 14px;
`;

const TrackAlbum = styled.div`
  width: 150px;
  text-align: left;
  display: -webkit-box;
  font-size: 14px;
  -webkit-line-clamp: 2; /* Number of lines for WebKit */
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2; /* Number of lines for Firefox */
  -moz-box-orient: vertical;
  display: -ms-flexbox;
  -ms-line-clamp: 2; /* Number of lines for Edge/IE */
  -ms-box-orient: vertical;
  display: box;
  line-clamp: 2; /* Number of lines for standard */
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SavedStatusContainer = styled.div<{ isSaved: boolean; isSelected: boolean }>`
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  path {
    stroke: ${({ isSelected }) => (isSelected ? COLORS.white : COLORS.black)};
  }
  ${({ isSaved, isSelected }) =>
    isSaved &&
    `
  path {
    stroke: ${isSelected ? COLORS.white : COLORS.primary};
    fill: ${isSelected ? COLORS.white : COLORS.primary};
  }
  `}
`;

const CheckboxContainer = styled.div`
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

const RightColumn = styled.div`
  padding-right: 10px;
`;
