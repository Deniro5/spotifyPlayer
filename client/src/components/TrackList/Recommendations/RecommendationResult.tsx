import React from "react";
import { Track } from "../../../types";
import SidebarTrackResult from "../SidebarTrackResult";
import useSpotifyApiActions from "../../../hooks/useSpotifyApiActions";

interface RecommendationResultProps {
  track: Track;
  handleRightClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    track: Track
  ) => void;
}

//need to pass play/pause here... playing a recommendation shouldnt interfere with the queue. Maybe queue the track and then play it...?

const RecommendationResult = ({ track, handleRightClick }: RecommendationResultProps) => {
  const { play } = useSpotifyApiActions();
  const handlePlay = async () => {
    //it would be better if this didnt clear the rest of the queue..
    play(undefined, undefined, track.uri);
  };

  return (
    <SidebarTrackResult
      track={track}
      handleRightClick={handleRightClick}
      handlePlay={handlePlay}
    />
  );
};

export default RecommendationResult;
