import { TrackListHeader } from "./TrackListHeader";
import LikedSongsAlbumImg from "../../assets/likedsongsalbum.png";
import { useAppSelector } from "../../hooks";
import { getTotalLikedSongs } from "../../redux/slices/selectors";

const LikedSongsHeader = () => {
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

export { LikedSongsHeader };
