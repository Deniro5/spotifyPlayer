/// <reference types="vite-plugin-svgr/client" />
import React from "react";
import { Track } from "../../../types";
import styled from "styled-components";
import PlayingGif from "../../../assets/sound.gif";
import PlayIcon from "../../../assets/play.svg?react";
import PauseIcon from "../../../assets/pause.svg?react";
import { COLORS } from "../../../constants";
import { useAppSelector } from "../../../hooks";
import {
  getIsPlaying,
  getPlayingTrack,
} from "../../../redux/slices/PlayerSlice/selectors";

export type ITrackTitleArtistAndImageProps = {
  track: Track;
  handlePlayOrPause: () => void | Promise<void>;
};

const TrackTitleArtistAndImage: React.FC<ITrackTitleArtistAndImageProps> = ({
  track,
  handlePlayOrPause,
}) => {
  const { albumUrl, name, artist, uri } = track;
  const isPlaying = useAppSelector(getIsPlaying);
  const playingTrack = useAppSelector(getPlayingTrack);
  return (
    <ImageAndNameContainer>
      <TrackImageContainer>
        <TrackImage src={albumUrl} />
        {isPlaying && playingTrack?.uri === track.uri && (
          <PlayStatus>
            <img height={50} width={35} src={PlayingGif} alt="" />
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
      <TrackTitleAndArtistContainer>
        <TrackTitle isActive={!!playingTrack && playingTrack?.uri === uri}>
          {name}
        </TrackTitle>
        <TrackArtist> {artist} </TrackArtist>
      </TrackTitleAndArtistContainer>
    </ImageAndNameContainer>
  );
};

const TrackTitleAndArtistContainer = styled.div``;

const TrackArtist = styled.div`
  font-size: 14px;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const TrackTitle = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  width: 245px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
  color: ${({ isActive }) => (isActive ? COLORS.primary : COLORS.black)};
`;

const ImageAndNameContainer = styled.div`
  display: flex;
  align-items: center;
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

const TrackImage = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 3px;
  margin: 0px 12px;
`;

export { TrackTitleArtistAndImage };
