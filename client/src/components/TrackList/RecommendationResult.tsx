import React from "react";
import styled from "styled-components";
import { Track } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addSelectedTrack, removeSelectedTrack } from "../../redux/slices/playerSlice";
import { COLORS } from "../../constants";
import useSpotifyApiActions from "../../hooks/useSpotifyApiActions";
import { TrackTitleArtistAndImage } from "./TrackResultComponents/TrackTitleArtistAndImage";
import { TrackTitle } from "./TrackResultComponents/TrackTitleArtistAndImage";

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
  const { pause, play } = useSpotifyApiActions();
  const { uri } = track;
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.metaKey) {
      handleToggleSelected();
    }
  };

  const handlePlayOrPause = () =>
    playingTrack?.uri === track.uri ? handlePause() : handlePlay();

  const handlePlay = async () => {
    //TODO figure out how to handle 'liked songs' because that isnt a playlist but we still want sequential play
    if (!accessToken) return;
    //if we are on a playlist we want to send the playlist and an offset. If not send the track
    play(undefined, undefined, track.uri);
  };

  const handlePause = () => {
    pause();
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
      onDoubleClick={handlePlay}
      onContextMenu={(e) => handleRightClick(e, uri)}
    >
      <TrackTitleArtistAndImage track={track} handlePlayOrPause={handlePlayOrPause} />
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
