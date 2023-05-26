import React, { useState, useEffect } from "react";
import { TrackSearchResult } from "./TrackSearchResult";
import { Waypoint } from "react-waypoint";
import { TrackContextMenu } from "../ContextMenus/TrackContextMenu";
import { COLORS } from "../../constants";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getSelectedTracksHashLength,
  setSelectedTracksHash,
} from "../../redux/slices/playerSlice";
export type ITrackListProps = {
  isUserTracks: boolean; //determines which type of listItem we want (with/without user operations);
  loadMoreTracks: () => void;
};

const TrackList: React.FC<ITrackListProps> = ({ loadMoreTracks }) => {
  const currentDisplayTracks = useAppSelector(
    (state) => state.player.currentDisplayTracks
  );
  const selectedTracksHashLength = useAppSelector(getSelectedTracksHashLength);
  const dispatch = useAppDispatch();
  const selectedTracksHash = useAppSelector((state) => state.player.selectedTracksHash);
  const selectedPlaylistId = useAppSelector((state) => state.player.selectedPlaylistId);

  useEffect(() => {
    const container = document.getElementById("scrollContainer");
    if (container) setTimeout(() => (container.scrollTop = 0), 300);
  }, [selectedPlaylistId]);

  const [contextMenuId, setContextMenuId] = useState<string | null>(null);
  const [contextMenuX, setContextMenuX] = useState<number>(0);
  const [contextMenuY, setContextMenuY] = useState<number>(0);

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

  const handleBatchSelectClear = () => {
    dispatch(setSelectedTracksHash({}));
  };

  return (
    <>
      <Container>
        <TrackListBatchOptions>
          {selectedTracksHashLength > 1 && (
            <BatchClear onClick={handleBatchSelectClear}> Clear </BatchClear>
          )}
        </TrackListBatchOptions>
        <ScrollContainer id='scrollContainer'>
          {currentDisplayTracks.map((track, index) => (
            <TrackSearchResult
              handleRightClick={handleRightClick}
              track={track}
              key={track.uri}
              isSelected={Number.isInteger(selectedTracksHash[track.uri])}
              index={index}
            />
          ))}
          <Waypoint onEnter={handleLoadMoreTracks} />
        </ScrollContainer>

        {contextMenuId && (
          <TrackContextMenu
            contextMenuId={contextMenuId}
            setContextMenuId={setContextMenuId}
            contextMenuX={contextMenuX}
            contextMenuY={contextMenuY}
          />
        )}
      </Container>
    </>
  );
};

const BatchClear = styled.div`
  color: ${COLORS.primary};
  cursor: pointer;
  &:hover {
    color: ${COLORS.darkPrimary};
  }
`;

const TrackListBatchOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 20px;
  margin-bottom: 5px;
  padding-right: 18px;
`;

const Container = styled.div`
  width: 95%;
  margin: auto;
`;

const ScrollContainer = styled.div`
  height: calc(100vh - 168px);
  overflow: scroll;
`;

export { TrackList };
