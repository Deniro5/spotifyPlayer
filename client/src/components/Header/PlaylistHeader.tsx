import { useAppSelector } from "../../hooks";
import { getSelectedPlaylist } from "../../redux/selectors";
import TrackListHeader from "./TrackListHeader";
import RecentlyPlayedAlbumImg from "../../assets/question.png";

const PlaylistHeader = ({}) => {
  const selectedPlaylist = useAppSelector(getSelectedPlaylist);

  return selectedPlaylist ? (
    <TrackListHeader
      name={selectedPlaylist.name}
      trackCount={selectedPlaylist.tracks.total}
      imgSrc={selectedPlaylist.images[0]?.url || RecentlyPlayedAlbumImg}
    />
  ) : (
    <></>
  );
};

export default PlaylistHeader;
