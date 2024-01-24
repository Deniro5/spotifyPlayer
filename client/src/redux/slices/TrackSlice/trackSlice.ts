/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../../../types";

// Define the state of the slice as an object
export interface TrackState {
  currentDisplayTracks: Track[]; // t
  selectedTracksHash: Record<string, number>; //t
  songsStatusHash: Record<string, boolean>; //t
}

// Define an initial state
const initialState: TrackState = {
  currentDisplayTracks: [],
  selectedTracksHash: {},
  songsStatusHash: {},
};

// Create a slice containing the configuration of the state
// and the reducers functions
const trackSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentDisplayTracks(
      state,
      action: PayloadAction<{ tracks: Track[]; isInitialLoad: boolean }>
    ) {
      const { isInitialLoad, tracks } = action.payload;
      state.currentDisplayTracks = [
        ...(isInitialLoad ? [] : state.currentDisplayTracks),
        ...tracks,
      ];
    },
    moveTrackInDisplay(
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) {
      const updatedDisplayTracks = [...state.currentDisplayTracks];
      const track = updatedDisplayTracks.splice(
        action.payload.sourceIndex,
        1
      )[0];
      updatedDisplayTracks.splice(action.payload.destinationIndex, 0, track);
      state.currentDisplayTracks = updatedDisplayTracks;
    },
    addTracksToDisplay(state, action: PayloadAction<{ tracks: Track[] }>) {
      state.currentDisplayTracks = [
        ...action.payload.tracks,
        ...state.currentDisplayTracks,
      ];
    },
    removeTracksFromDisplay(state, action: PayloadAction<(string | null)[]>) {
      const tracksToDeleteHash: Record<string, boolean> = action.payload.reduce(
        (accumulator, value) => {
          return { ...accumulator, ...(value ? { [value]: true } : {}) };
        },
        {}
      );
      state.currentDisplayTracks = state.currentDisplayTracks.filter(
        (track) => !tracksToDeleteHash[track.uri]
      );
    },
    setSelectedTracksHash(
      state,
      action: PayloadAction<Record<string, number>>
    ) {
      state.selectedTracksHash = action.payload;
    },
    addSelectedTrack(
      state,
      action: PayloadAction<{ trackUri: string; trackIndex: number }>
    ) {
      state.selectedTracksHash[action.payload.trackUri] =
        action.payload.trackIndex;
    },
    removeSelectedTrack(state, action: PayloadAction<string>) {
      delete state.selectedTracksHash[action.payload];
    },
    addSongsStatusHash(state, action: PayloadAction<Record<string, boolean>>) {
      state.songsStatusHash = { ...state.songsStatusHash, ...action.payload };
    },
  },
});

// Export each reducers function defined in createSlice
export const {
  setCurrentDisplayTracks,
  moveTrackInDisplay,
  addTracksToDisplay,
  removeTracksFromDisplay,
  setSelectedTracksHash,
  addSelectedTrack,
  removeSelectedTrack,
  addSongsStatusHash,
} = trackSlice.actions;

// Export default the slice reducer
export default trackSlice.reducer;
