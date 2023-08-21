import { PayloadAction, createSelector } from "@reduxjs/toolkit";
import playerSlice from "./playerSlice";
import { RootState } from "../store";

const getRootState = (state: RootState) => state;

export const getAccessToken = createSelector(
  [getRootState],
  (state) => state.player.accessToken
);

export const getSearch = createSelector([getRootState], (state) => state.player.search);

export const getSelectedPlaylistId = createSelector(
  [getRootState],
  (state) => state.player.selectedPlaylistId
);

export const getPlaylists = createSelector(
  [getRootState],
  (state) => state.player.playlists
);

export const getPlaylistById = (playlistId: String | null) =>
  createSelector([getRootState], (state) =>
    state.player.playlists.find((playlist) => playlist.id === playlistId)
  );

export const getCurrentView = createSelector(
  [getRootState],
  (state) => state.player.currentView
);

export const getCurrentDisplayTracks = createSelector(
  [getRootState],
  (state) => state.player.currentDisplayTracks
);

export const getPlayingTrack = createSelector(
  [getRootState],
  (state) => state.player.playingTrack
);

export const getCurrentUser = createSelector(
  [getRootState],
  (state) => state.player.currentUser
);

export const getSelectedTracksHash = createSelector(
  [getRootState],
  (state) => state.player.selectedTracksHash
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

export const getLastPlaylistAddedTo = createSelector(
  [getRootState],
  (state) => state.player.lastPlaylistAddedTo
);

export const getShowSuggestionSection = createSelector(
  [getRootState],
  (state) => state.player.showSuggestionSection
);

export const getPlaylistSortOption = createSelector(
  [getRootState],
  (state) => state.player.playlistSortOption
);

export const getShuffle = createSelector([getRootState], (state) => state.player.shuffle);

export const getShowRecommendations = createSelector(
  [getRootState],
  (state) => state.player.showRecommendations
);

export const getShouldUseRecommendationSliders = createSelector(
  [getRootState],
  (state) => state.player.shouldUseRecommendationSliders
);

export const getRecommendationSettings = createSelector(
  [getRootState],
  (state) => state.player.recommendationSettings
);

export const getRecommendedTracks = createSelector(
  [getRootState],
  (state) => state.player.recommendedTracks
);

export const getIsPlaying = createSelector(
  [getRootState],
  (state) => state.player.isPlaying
);

export const getDeviceId = createSelector(
  [getRootState],
  (state) => state.player.deviceId
);
