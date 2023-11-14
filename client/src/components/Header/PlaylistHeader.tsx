import React from "react";
import { useAppSelector } from "../../hooks";
import { getSelectedPlaylist } from "../../redux/slices/selectors";
import { TrackListHeader } from "./TrackListHeader";

const PlaylistHeader = ({}) => {
  const selectedPlaylist = useAppSelector(getSelectedPlaylist);

  return selectedPlaylist ? (
    <TrackListHeader
      name={selectedPlaylist.name}
      trackCount={selectedPlaylist.tracks.total}
      imgSrc={selectedPlaylist.images[0].url}
    />
  ) : (
    <></>
  );
};

export { PlaylistHeader };
