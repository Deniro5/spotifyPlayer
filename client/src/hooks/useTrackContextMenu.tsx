import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { Track } from "../types";
import { setSelectedTracksHash } from "../redux/slices/TrackSlice/trackSlice";
import TrackContextMenu from "../components/ContextMenus/TrackContextMenu";

type useTrackContextMenuProps = {
  hideAddToQueue?: boolean;
  hideRemoveSong?: boolean;
};

const useTrackContextMenu = ({
  hideAddToQueue,
  hideRemoveSong,
}: useTrackContextMenuProps) => {
  const [contextMenuTrack, setContextMenuTrack] = useState<Track | null>(null);
  const [contextMenuX, setContextMenuX] = useState<number>(0);
  const [contextMenuY, setContextMenuY] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    track: Track
  ) => {
    e.preventDefault();
    dispatch(setSelectedTracksHash({}));
    setContextMenuX(Math.min(e.clientX, window.innerWidth));
    setContextMenuY(Math.min(e.clientY, window.innerHeight));
    setContextMenuTrack(track);
  };

  const contextMenu = (
    <TrackContextMenu
      setContextMenuTrack={setContextMenuTrack}
      contextMenuTrack={contextMenuTrack}
      contextMenuX={contextMenuX}
      contextMenuY={contextMenuY}
      hideAddToQueue={hideAddToQueue}
      hideRemoveSong={hideRemoveSong}
    />
  );

  return {
    handleRightClick,
    contextMenuX,
    contextMenuY,
    contextMenuTrack,
    contextMenu,
  };
};

export default useTrackContextMenu;
