import React from "react";
import useFetchLikedSongs from "../../hooks/useFetchLikedSongs";
import TrackList from "../TrackList";

const LikedSongs = () => {
  const { isFetchingInitial, loadMoreTracks, errorMessage } = useFetchLikedSongs();

  return <TrackList isUserTracks={false} loadMoreTracks={loadMoreTracks} />;
};

export { LikedSongs };
