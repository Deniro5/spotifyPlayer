import React from "react";
import { useAppSelector } from "../../hooks";
import { TrackSearchResult } from "./TrackSearchResult";
import { Waypoint } from "react-waypoint";

export type ITrackListProps = {
  isUserTracks: boolean; //determines which type of listItem we want (with/without user operations);
  loadMoreTracks: () => void;
};

const TrackList: React.FC<ITrackListProps> = ({ loadMoreTracks }) => {
  const currentDisplayTracks = useAppSelector(
    (state) => state.player.currentDisplayTracks
  );

  const handleLoadMoreTracks = () => {
    //We dont want to attempt to load more via waypoint if there are no songs
    if (currentDisplayTracks.length > 0) {
      loadMoreTracks();
    }
  };

  return (
    <>
      {currentDisplayTracks.map((track) => (
        <TrackSearchResult track={track} key={track.uri} />
      ))}
      <Waypoint onEnter={handleLoadMoreTracks} />
    </>
  );
};

export { TrackList };
