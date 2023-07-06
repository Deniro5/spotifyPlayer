import React from "react";
import styled from "styled-components";
import { Track } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addSelectedTrack, removeSelectedTrack } from "../../redux/slices/playerSlice";
import { COLORS } from "../../constants";
import { ReactComponent as PlayIcon } from "../../assets/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause.svg";
import PlayingGif from "../../assets/sound.gif";
import useSpotifyApiActions from "../../hooks/useSpotifyApiActions";

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
  const { uri, artist, title, albumUrl } = track;
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);
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
      <ImageAndNameContainer>
        <TrackImageContainer>
          <TrackImage src={albumUrl} />
          <PlayStatus>
            {isPlaying && playingTrack?.uri === track.uri && (
              <img height={18} width={18} src={PlayingGif} alt='' />
            )}
          </PlayStatus>
          <HiddenButton onClick={handlePlayOrPause}>
            {isPlaying && playingTrack?.uri === uri ? (
              <StyledPauseIcon height={18} width={18} />
            ) : (
              <StyledPlayIcon height={20} width={20} />
            )}
          </HiddenButton>
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

const TrackTitleAndArtistContainer = styled.div``;

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

const PlayStatus = styled.div`
  height: 35px;
  width: 35px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  visibility: visible;
  top: 10px;
  left: 20px;
`;

const TrackImageContainer = styled.div`
  position: relative;
  &:hover {
    ${HiddenButton} {
      visibility: visible;
    }
    ${PlayStatus} {
      visiblilty: hidden;
    }
  }
`;
