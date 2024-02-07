import React, { useEffect } from "react";
import TrackSearchResult from "./TrackSearchResult";
import { Waypoint } from "react-waypoint";
import { COLORS } from "../../constants";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getSelectedPlaylistId,
  getSelectedTracksHash,
  getShowRecommendations,
  getSelectedTracksHashLength,
  getCurrentView,
  getIsRecommendationsView,
  getCurrentDisplayTracks,
} from "../../redux/selectors";
import { DropResult } from "react-beautiful-dnd";
import usePlaylistActions from "../../hooks/usePlaylistActions";
import { View } from "../../types";
import SkeletonLoader from "../Common/Loaders/SkeletonLoader";
import { setSelectedTracksHash } from "../../redux/slices/TrackSlice/trackSlice";
import useTrackContextMenu from "../../hooks/useTrackContextMenu";

export type ITrackListProps = {
  isUserTracks: boolean; //determines which type of listItem we want (with/without user operations);
  loadMoreTracks: () => void;
  isLoading: boolean;
};

const TrackList: React.FC<ITrackListProps> = ({
  loadMoreTracks,
  isLoading,
}) => {
  const selectedPlaylistId = useAppSelector(getSelectedPlaylistId);
  const { handleMoveTrack } = usePlaylistActions(selectedPlaylistId);
  const currentDisplayTracks = useAppSelector(getCurrentDisplayTracks);
  const selectedTracksHashLength = useAppSelector(getSelectedTracksHashLength);
  const dispatch = useAppDispatch();
  const selectedTracksHash = useAppSelector(getSelectedTracksHash);
  const currentView = useAppSelector(getCurrentView);
  const showRecommendations = useAppSelector(getShowRecommendations);
  const isRecommendationsView = useAppSelector(getIsRecommendationsView);

  const {
    contextMenu: TrackContextMenu,
    handleRightClick,
    contextMenuTrack,
  } = useTrackContextMenu({ hideRemoveSong: currentView === View.BROWSE });

  useEffect(() => {
    const container = document.getElementById("scrollContainer");
    if (container) setTimeout(() => (container.scrollTop = 0), 300);
  }, [selectedPlaylistId]);

  const handleLoadMoreTracks = () => {
    //We dont want to attempt to load more via waypoint if there are no songs
    if (currentDisplayTracks.length > 0) {
      loadMoreTracks();
    }
  };

  const handleBatchSelectClear = () => {
    dispatch(setSelectedTracksHash({}));
  };

  // const onDragEnd = (result: DropResult) => {   // what us happening here
  //   const { destination, source } = result;
  //   if (!destination) return;

  //   handleMoveTrack(source.index, destination.index);
  //   dispatch(
  //     moveTrackInDisplay({
  //       sourceIndex: source.index,
  //       destinationIndex: destination.index,
  //     })
  //   );
  // };

  return (
    <TrackListContainer
      isFullWidth={!showRecommendations || !isRecommendationsView}
    >
      <TrackListBatchOptions>
        {selectedTracksHashLength > 1 && (
          <BatchClear onClick={handleBatchSelectClear}> Clear </BatchClear>
        )}
      </TrackListBatchOptions>
      <ScrollContainer id="scrollContainer">
        {isLoading ? (
          <SkeletonLoader count={25} height={50} />
        ) : (
          <>
            {currentDisplayTracks.length ? (
              currentDisplayTracks.map((track, index) => (
                <TrackSearchResult
                  handleRightClick={(e) => handleRightClick(e, track)}
                  track={track}
                  key={`${selectedPlaylistId || "likedsongs"}/${track.uri}`}
                  isSelected={Number.isInteger(selectedTracksHash[track.uri])}
                  index={index}
                />
              ))
            ) : (
              <EmptyMessage>
                There are no tracks currently in this playlist...
              </EmptyMessage>
            )}
          </>
        )}
        <Waypoint bottomOffset={"-25%"} onEnter={handleLoadMoreTracks} />
      </ScrollContainer>

      {contextMenuTrack && TrackContextMenu}
    </TrackListContainer>
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

const TrackListContainer = styled.div<{ isFullWidth: boolean }>`
  @media (max-width: 1135px) {
    width: 100% !important;
  }
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "75%")};
  padding: 0px 10px;
`;

const ScrollContainer = styled.div`
  height: calc(100vh - 200px);
  border-top: 1px solid ${COLORS.lightSecondary};
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EmptyMessage = styled.p`
  font-weight: 400;
  color: ${COLORS.lightFont};
  padding: 16px;
`;

export default TrackList;
