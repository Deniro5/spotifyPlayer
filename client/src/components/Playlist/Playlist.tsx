import React from "react";
import { useAppSelector } from "../../hooks";
import useFetchPlaylistSongs from "../../hooks/useFetchPlaylistSongs";
import TrackList from "../TrackList";

const Playlist = () => {
  const { isFetchingInitial, loadMoreTracks, errorMessage } = useFetchPlaylistSongs();

  return <TrackList isUserTracks loadMoreTracks={loadMoreTracks} />;
};

export { Playlist };
