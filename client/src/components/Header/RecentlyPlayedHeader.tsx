import React from "react";
import { useAppSelector } from "../../hooks";
import { TrackListHeader } from "./TrackListHeader";
import { getCurrentDisplayTracks } from "../../redux/slices/selectors";
import RecentlyPlayedAlbumImg from "../../assets/recentlyplayedalbum.png";

const RecentlyPlayedHeader = () => {
  //this is too slow, we will see the old count behind it
  const displayTracks = useAppSelector(getCurrentDisplayTracks);
  return (
    <TrackListHeader
      name={"Recently Played"}
      trackCount={displayTracks.length.toString()}
      imgSrc={RecentlyPlayedAlbumImg}
    />
  );
};

export { RecentlyPlayedHeader };
