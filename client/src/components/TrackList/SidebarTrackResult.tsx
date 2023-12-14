import React from "react";
import styled from "styled-components";
import { Track } from "../../types";
import { COLORS } from "../../constants";
import { TrackTitleArtistAndImage } from "./TrackResultComponents/TrackTitleArtistAndImage";

interface SidebarTrackResultProps {
  track: Track;
  handleRightClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    track: Track
  ) => void;
  handlePlay: () => Promise<void>;
}

const SidebarTrackResult = ({
  track,
  handleRightClick,
  handlePlay,
}: SidebarTrackResultProps) => {
  return (
    <Container
      onDoubleClick={handlePlay}
      onContextMenu={(e) => handleRightClick(e, track)}
    >
      <TrackTitleArtistAndImage track={track} handlePlayOrPause={handlePlay} />
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
  color: ${COLORS.lightFont};
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

export default SidebarTrackResult;
