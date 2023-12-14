import TrackList from "../TrackList";
import useFetchRecentSongs from "../../hooks/useFetchRecentSongs";

const RecentSongs = () => {
  const { isFetching } = useFetchRecentSongs();

  return (
    <TrackList isLoading={isFetching} isUserTracks={false} loadMoreTracks={() => {}} />
  );
};

export { RecentSongs };
