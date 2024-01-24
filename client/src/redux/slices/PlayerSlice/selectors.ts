import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const getRootState = (state: RootState) => state;

export const getAccessToken = createSelector(
  [getRootState],
  (state) => state.player.accessToken
);

export const getPlayingTrack = createSelector(
  [getRootState],
  (state) => state.player.playingTrack
);

export const getShuffle = createSelector(
  [getRootState],
  (state) => state.player.shuffle
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

export const getSleepTimer = createSelector(
  [getRootState],
  (state) => state.player.sleepTimer
);

export const getSleepTimerMinutes = createSelector(
  [getRootState],
  (state) => state.player.sleepTimerMinutes
);
