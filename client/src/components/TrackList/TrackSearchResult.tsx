import React, { useState } from "react";
import styled from "styled-components";
import { MillisecondsToMinutesAndSeconds } from "../../utils";
import fakeSrc from "../../assets/profile.jpeg";
import { Track } from "../../types";
import { useAppDispatch } from "../../hooks";
import { setPlayingTrack } from "../../redux/slices/playerSlice";

interface TrackSearchResultProps {
  track: Track;
  handleRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
}

export const TrackSearchResult = ({
  track,
  handleRightClick,
}: TrackSearchResultProps) => {
  const { seconds, minutes } = MillisecondsToMinutesAndSeconds(track.duration);
  const dispatch = useAppDispatch();

  const handlePlay = () => {
    dispatch(setPlayingTrack(track));
  };

  return (
    <Container onClick={handlePlay} onContextMenu={(e) => handleRightClick(e, track.uri)}>
      <ImageAndNameContainer>
        <TrackImage src={track.albumUrl} />
        <TrackTitle>{track.title}</TrackTitle>
      </ImageAndNameContainer>
      <TrackArtist>{track.artist}</TrackArtist>
      <TrackDuration>{`${minutes}:${seconds} `}</TrackDuration>
      <LikeIconContainer>
        <LikeIcon src={fakeSrc} />
      </LikeIconContainer>
    </Container>
  );
};

const Container = styled.div`
  background: #fefefe;
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 2px auto;
  border: 1px solid whitesmoke;
  &:hover {
    background: whitesmoke;
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

const TrackTitle = styled.div`
  font-size: 14px;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  color: black;
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
const LikeIcon = styled.img`
  height: 20px;
  width: 20px;
`;
