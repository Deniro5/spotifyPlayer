import useFetchPlaylistSongs from "../../hooks/useFetchPlaylistSongs";
import TrackList from "../TrackList";

const Playlist = () => {
  const { loadMoreTracks, isFetchingInitial } = useFetchPlaylistSongs();

  return (
    <TrackList
      isLoading={isFetchingInitial}
      isUserTracks
      loadMoreTracks={loadMoreTracks}
    />
  );
};

export { Playlist };
