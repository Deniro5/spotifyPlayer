/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../../../types";
import { spotifyApi } from "react-spotify-web-playback";

// Define the state of the slice as an object
export interface PlayerState {
  accessToken: string | null;
  playingTrack: Track | null;
  shuffle: boolean;
  recommendedTracks: Track[];
  queueTracks: Track[];
  //need this to help us with placing the added track
  tracksManuallyAddedToQueue: Track[];
  isActive: boolean;
  isPlaying: boolean;
  deviceId: string | null;
  dontPopQueue: boolean;
  sleepTimer: NodeJS.Timeout | null;
  sleepTimerMinutes: number;
}

// Define an initial state
const initialState: PlayerState = {
  accessToken: null,
  playingTrack: null,
  shuffle: false,
  recommendedTracks: [],
  queueTracks: [],
  tracksManuallyAddedToQueue: [],
  isActive: false,
  isPlaying: false,
  deviceId: null,
  dontPopQueue: false,
  sleepTimer: null,
  sleepTimerMinutes: 0,
};

// Create a slice containing the configuration of the state
// and the reducers functions
const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setPlayingTrack(state, action: PayloadAction<Track | null>) {
      state.playingTrack = action.payload;
    },
    setShuffle(state, action: PayloadAction<boolean>) {
      state.shuffle = action.payload;
    },
    setRecommendedTracks(state, action: PayloadAction<Track[]>) {
      state.recommendedTracks = action.payload;
    },
    setQueueTracks(state, action: PayloadAction<Track[]>) {
      state.queueTracks = action.payload;
    },
    setTracksManuallyAddedToQueue(state, action: PayloadAction<Track[]>) {
      state.tracksManuallyAddedToQueue = action.payload;
    },
    popTracksManuallyAddedToQueue(state) {
      let newTracksManuallyAddedToQueue = [...state.tracksManuallyAddedToQueue];
      newTracksManuallyAddedToQueue.shift();
      state.tracksManuallyAddedToQueue = newTracksManuallyAddedToQueue;
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setIsActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    setDeviceId(state, action: PayloadAction<string>) {
      state.deviceId = action.payload;
    },
    setDontPopQueue(state, action: PayloadAction<boolean>) {
      state.dontPopQueue = action.payload;
    },
    clearSleepTimer(state) {
      if (state.sleepTimer) {
        clearTimeout(state.sleepTimer);
        state.sleepTimer = null;
        state.sleepTimerMinutes = 0;
      }
    },
    setSleepTimer(state, action: PayloadAction<NodeJS.Timeout>) {
      if (state.sleepTimer) {
        clearTimeout(state.sleepTimer);
      }
      state.sleepTimer = action.payload;
    },
    setSleepTimerMinutes(state, action: PayloadAction<number>) {
      state.sleepTimerMinutes = action.payload;
    },
    decrementSleepTimerMinutes(state) {
      if (
        state.sleepTimerMinutes === 1 &&
        state.sleepTimer &&
        state.accessToken &&
        state.deviceId
      ) {
        clearTimeout(state.sleepTimer);
        state.sleepTimer = null;
        spotifyApi.pause(state.accessToken, state.deviceId);
      }
      state.sleepTimerMinutes--;
    },
  },
});

// Export each reducers function defined in createSlice
export const {
  setAccessToken,
  setPlayingTrack,
  setShuffle,
  setRecommendedTracks,
  setQueueTracks,
  setTracksManuallyAddedToQueue,
  popTracksManuallyAddedToQueue,
  setIsActive,
  setIsPlaying,
  setDeviceId,
  setDontPopQueue,
  setSleepTimer,
  clearSleepTimer,
  setSleepTimerMinutes,
  decrementSleepTimerMinutes,
} = playerSlice.actions;

// Export default the slice reducer
export default playerSlice.reducer;
