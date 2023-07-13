import React from "react";
import useFetchPlaylistSongs from "../../hooks/useFetchPlaylistSongs";
import TrackList from "../TrackList";

const Playlist = () => {
  const { loadMoreTracks, errorMessage } = useFetchPlaylistSongs();

  return <TrackList isUserTracks loadMoreTracks={loadMoreTracks} />;
};

export { Playlist };
