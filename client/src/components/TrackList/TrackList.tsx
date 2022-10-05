import React, { useState } from "react";
import { useAppSelector } from "../../hooks";
import { TrackSearchResult } from "./TrackSearchResult";
import { Waypoint } from "react-waypoint";
import { TrackContextMenu } from "../ContextMenus/TrackContextMenu";

export type ITrackListProps = {
  isUserTracks: boolean; //determines which type of listItem we want (with/without user operations);
  loadMoreTracks: () => void;
};

const TrackList: React.FC<ITrackListProps> = ({ loadMoreTracks }) => {
  const currentDisplayTracks = useAppSelector(
    (state) => state.player.currentDisplayTracks
  );
  const selectedTracksHash = useAppSelector((state) => state.player.selectedTracksHash);
  const [contextMenuId, setContextMenuId] = useState<string | null>(null);
  const [contextMenuX, setContextMenuX] = useState<number | null>(null);
  const [contextMenuY, setContextMenuY] = useState<number | null>(null);

  const handleLoadMoreTracks = () => {
    //We dont want to attempt to load more via waypoint if there are no songs
    if (currentDisplayTracks.length > 0) {
      loadMoreTracks();
    }
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    setContextMenuX(Math.min(e.clientX, window.innerWidth));
    setContextMenuY(Math.min(e.clientY, window.innerHeight));
    setContextMenuId(id);
  };

  return (
    <>
      {currentDisplayTracks.map((track) => (
        <TrackSearchResult
          handleRightClick={handleRightClick}
          track={track}
          key={track.uri}
          isSelected={selectedTracksHash[track.uri]}
        />
      ))}
      <Waypoint onEnter={handleLoadMoreTracks} />
      {contextMenuId && (
        <TrackContextMenu
          contextMenuId={contextMenuId}
          setContextMenuId={setContextMenuId}
          contextMenuX={contextMenuX}
          contextMenuY={contextMenuY}
        />
      )}
    </>
  );
};

export { TrackList };
