import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { View } from "../../types";

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

export const getSelectedPlaylist = createSelector([getRootState], (state) =>
  state.player.playlists.find(
    (playlist) => state.player.selectedPlaylistId === playlist.id
  )
);

export const getCurrentView = createSelector(
  [getRootState],
  (state) => state.player.currentView
);

export const getCurrentDisplayTracks = createSelector(
  [getRootState],
  (state) => state.player.currentDisplayTracks
);

export const getTotalLikedSongs = createSelector(
  [getRootState],
  (state) => state.player.totalLikedSongs
);

export const getTotalRecentSongs = createSelector(
  [getRootState],
  (state) => state.player.totalRecentSongs
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

export const getQueueTracks = createSelector(
  [getRootState],
  (state) => state.player.queueTracks
);

export const getTracksManuallyAddedToQueue = createSelector(
  [getRootState],
  (state) => state.player.tracksManuallyAddedToQueue
);

export const getIsPlaying = createSelector(
  [getRootState],
  (state) => state.player.isPlaying
);

export const getIsActive = createSelector(
  [getRootState],
  (state) => state.player.isActive
);

export const getDeviceId = createSelector(
  [getRootState],
  (state) => state.player.deviceId
);

export const getDontPopQueue = createSelector(
  [getRootState],
  (state) => state.player.dontPopQueue
);

export const getSongsStatusHash = createSelector(
  [getRootState],
  (state) => state.player.songsStatusHash
);

export const getSleepTimer = createSelector(
  [getRootState],
  (state) => state.player.sleepTimer
);

export const getSleepTimerMinutes = createSelector(
  [getRootState],
  (state) => state.player.sleepTimerMinutes
);

export const getToast = createSelector([getRootState], (state) => state.player.toast);

export const getIsRecommendationsView = createSelector(
  [getRootState],
  (state) =>
    state.player.currentView === View.LIKED_SONGS ||
    state.player.currentView === View.RECENT_SONGS ||
    state.player.currentView === View.PLAYLIST
);
