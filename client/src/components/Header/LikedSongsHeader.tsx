import TrackListHeader from "./TrackListHeader";
import LikedSongsAlbumImg from "../../assets/likedsongsalbum.png";
import { useAppSelector } from "../../hooks";
import { getTotalLikedSongs } from "../../redux/selectors";

const LikedSongsHeader = () => {
  getTotalLikedSongs;
  const trackCount = useAppSelector(getTotalLikedSongs);

  return (
    <>
      <TrackListHeader
        name={"Liked Songs"}
        trackCount={trackCount.toString()}
        imgSrc={LikedSongsAlbumImg}
      />
    </>
  );
};

export default LikedSongsHeader;
