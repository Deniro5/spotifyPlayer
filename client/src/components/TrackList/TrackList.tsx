import React, { useState, useEffect } from "react";
import { TrackSearchResult } from "./TrackSearchResult";
import { Waypoint } from "react-waypoint";
import { TrackContextMenu } from "../ContextMenus/TrackContextMenu";
import { COLORS } from "../../constants";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Recommendations } from "./Recommendations";
import {
  getSelectedPlaylistId,
  getSelectedTracksHash,
  getShowRecommendations,
  getSelectedTracksHashLength,
} from "../../redux/slices/selectors";
import {
  moveTrackInDisplay,
  setCurrentDisplayTracks,
  setSelectedTracksHash,
} from "../../redux/slices/playerSlice";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from "react-beautiful-dnd";
import usePlaylistActions from "../../hooks/usePlaylistActions";
import { Queue } from "./Queue";
import { Track } from "../../types";

export type ITrackListProps = {
  isUserTracks: boolean; //determines which type of listItem we want (with/without user operations);
  loadMoreTracks: () => void;
};

const TrackList: React.FC<ITrackListProps> = ({ loadMoreTracks }) => {
  const selectedPlaylistId = useAppSelector(getSelectedPlaylistId);
  const { handleMoveTrack } = usePlaylistActions(selectedPlaylistId);
  const currentDisplayTracks = useAppSelector(
    (state) => state.player.currentDisplayTracks
  );
  const selectedTracksHashLength = useAppSelector(getSelectedTracksHashLength);
  const dispatch = useAppDispatch();
  const selectedTracksHash = useAppSelector(getSelectedTracksHash);

  const showRecommendations = useAppSelector(getShowRecommendations);

  useEffect(() => {
    const container = document.getElementById("scrollContainer");
    if (container) setTimeout(() => (container.scrollTop = 0), 300);
  }, [selectedPlaylistId]);

  const [contextMenuTrack, setContextMenuTrack] = useState<Track | null>(null);
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
    track: Track
  ) => {
    e.preventDefault();
    setContextMenuX(Math.min(e.clientX, window.innerWidth));
    setContextMenuY(Math.min(e.clientY, window.innerHeight));
    setContextMenuTrack(track);
  };

  const handleBatchSelectClear = () => {
    dispatch(setSelectedTracksHash({}));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    handleMoveTrack(source.index, destination.index);
    dispatch(
      moveTrackInDisplay({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <TrackListAndRecommendationsContainer>
      <TrackListContainer isFullWidth={!showRecommendations}>
        <TrackListBatchOptions>
          {selectedTracksHashLength > 1 && (
            <BatchClear onClick={handleBatchSelectClear}> Clear </BatchClear>
          )}
        </TrackListBatchOptions>
        <ScrollContainer id='scrollContainer'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {currentDisplayTracks.map((track, index) => (
                    <Draggable key={track.uri} draggableId={track.uri} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TrackSearchResult
                            handleRightClick={(e) => handleRightClick(e, track)}
                            track={track}
                            key={`${selectedPlaylistId || "likedsongs"}/${track.uri}`}
                            isSelected={Number.isInteger(selectedTracksHash[track.uri])}
                            index={index}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Waypoint onEnter={handleLoadMoreTracks} />
        </ScrollContainer>

        {contextMenuTrack && (
          <TrackContextMenu
            contextMenuTrack={contextMenuTrack}
            setContextMenuTrack={setContextMenuTrack}
            contextMenuX={contextMenuX}
            contextMenuY={contextMenuY}
          />
        )}
      </TrackListContainer>
      {showRecommendations && (
        <RightSidebar>
          <Recommendations />
          <Queue />
        </RightSidebar>
      )}
    </TrackListAndRecommendationsContainer>
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

const TrackListAndRecommendationsContainer = styled.div`
  display: flex;
`;

const TrackListContainer = styled.div<{ isFullWidth: boolean }>`
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "75%")};
  padding: 0px 10px;
`;

const ScrollContainer = styled.div`
  height: calc(100vh - 168px);
  overflow: scroll;
`;

const RightSidebar = styled.div`
  display: flex;
  flex-direction: column;
`;

export { TrackList };
