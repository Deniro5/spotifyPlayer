import React from "react";
import TrackList from "../TrackList";
import useFetchRecentSongs from "../../hooks/useFetchRecentSongs";

const RecentSongs = () => {
  const { errorMessage } = useFetchRecentSongs();

  return <TrackList isUserTracks={false} loadMoreTracks={() => {}} />;
};

export { RecentSongs };
