import useFetchLikedSongs from "../../hooks/useFetchLikedSongs";
import TrackList from "../TrackList";

const LikedSongs = () => {
  const { isFetchingInitial, loadMoreTracks } = useFetchLikedSongs();

  return (
    <TrackList
      isLoading={isFetchingInitial}
      isUserTracks={false}
      loadMoreTracks={loadMoreTracks}
    />
  );
};

export { LikedSongs };
