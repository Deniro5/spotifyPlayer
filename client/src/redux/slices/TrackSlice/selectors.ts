import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const getRootState = (state: RootState) => state;

export const getCurrentDisplayTracks = createSelector(
  [getRootState],
  (state) => state.track.currentDisplayTracks
);

export const getSelectedTracksHash = createSelector(
  [getRootState],
  (state) => state.track.selectedTracksHash
);

export const getSelectedTracksArray = createSelector(
  [getSelectedTracksHash],
  (selectedTracksHash) => Object.keys(selectedTracksHash)
);

export const getEarliestSelectedTrackIndex = createSelector(
  [getSelectedTracksHash],
  (selectedTracksHash) =>
    Object.values(selectedTracksHash).length > 0
      ? Object.values(selectedTracksHash).reduce((lowestPosition, position) => {
          return Math.min(lowestPosition, position);
        }, Number.MAX_SAFE_INTEGER)
      : -1
);

export const getSelectedTracksHashLength = createSelector(
  [getSelectedTracksHash],
  (selectedTracksHash) => Object.keys(selectedTracksHash).length
);

export const getSongsStatusHash = createSelector(
  [getRootState],
  (state) => state.track.songsStatusHash
);
