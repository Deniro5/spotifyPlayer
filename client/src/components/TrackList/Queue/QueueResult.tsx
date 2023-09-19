import React from "react";
import { Track } from "../../../types";
import SidebarTrackResult from "../SidebarTrackResult";
import useSpotifyApiActions from "../../../hooks/useSpotifyApiActions";

interface QueueResultProps {
  track: Track;
  handleRightClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    track: Track
  ) => void;
  index: number;
}

const QueueResult = ({ track, handleRightClick, index }: QueueResultProps) => {
  const { next, doubleNext } = useSpotifyApiActions();

  //if we click on the first song jump once and the second song jump twice. Doesnt seem like spotify api gives us a better way
  const handlePlay = async () => ((await index) === 0 ? next() : doubleNext());

  return (
    <SidebarTrackResult
      track={track}
      handleRightClick={handleRightClick}
      handlePlay={handlePlay}
    />
  );
};

export default QueueResult;
