import React from "react";
import styled from "styled-components";
import { Track } from "../../types";
import { useAppSelector } from "../../hooks";
import { COLORS } from "../../constants";
import useSpotifyApiActions from "../../hooks/useSpotifyApiActions";
import { TrackTitleArtistAndImage } from "./TrackResultComponents/TrackTitleArtistAndImage";
import { getAccessToken, getPlayingTrack } from "../../redux/slices/selectors";

interface RecommendationResultProps {
  track: Track;
  handleRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
}

export const RecommendationResult = ({
  track,
  handleRightClick,
}: RecommendationResultProps) => {
  const { pause, play } = useSpotifyApiActions();
  const { uri } = track;
  const accessToken = useAppSelector(getAccessToken);
  const playingTrack = useAppSelector(getPlayingTrack);

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

  return (
    <Container onDoubleClick={handlePlay} onContextMenu={(e) => handleRightClick(e, uri)}>
      <TrackTitleArtistAndImage track={track} handlePlayOrPause={handlePlayOrPause} />
    </Container>
  );
};

const Container = styled.div`
  background: ${COLORS.trackBackground};
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 1px auto;
  border: 1px solid ${COLORS.whitesmoke};
  color: ${COLORS.mediumGrey};
  &:hover {
    background: ${COLORS.white};
  }
  border-radius: 4px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
