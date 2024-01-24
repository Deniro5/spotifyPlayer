import { useAppSelector } from "../../hooks";
import { TrackListHeader } from "./TrackListHeader";
import { getTotalRecentSongs } from "../../redux/selectors";
import RecentlyPlayedAlbumImg from "../../assets/recentlyplayedalbum.png";

const RecentlyPlayedHeader = () => {
  //this is too slow, we will see the old count behind it
  const trackCount = useAppSelector(getTotalRecentSongs);
  return (
    <TrackListHeader
      name={"Recently Played"}
      trackCount={trackCount.toString()}
      imgSrc={RecentlyPlayedAlbumImg}
    />
  );
};

export { RecentlyPlayedHeader };
