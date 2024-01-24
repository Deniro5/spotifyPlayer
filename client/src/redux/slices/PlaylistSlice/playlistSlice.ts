/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Playlist, PlaylistSortOptions } from "../../../types";

// Define the state of the slice as an object
export interface PlaylistState {
  selectedPlaylistId: string | null;
  playlists: Playlist[];
  lastPlaylistAddedTo: Playlist | null;
  playlistSortOption: string;
}

// Define an initial state
const initialState: PlaylistState = {
  selectedPlaylistId: null,
  playlists: [],
  lastPlaylistAddedTo: null,
  playlistSortOption: PlaylistSortOptions.MOST_RECENT,
};

// Create a slice containing the configuration of the state
// and the reducers functions
const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setSelectedPlaylistId(state, action: PayloadAction<string | null>) {
      state.selectedPlaylistId = action.payload;
    },
    setPlaylists(state, action: PayloadAction<Playlist[]>) {
      state.playlists = action.payload;
    },
    addPlaylist(state, action: PayloadAction<Playlist>) {
      state.playlists = [action.payload, ...state.playlists];
    },
    deletePlaylist(state, action: PayloadAction<string>) {
      state.playlists = state.playlists.filter(
        (playlist) => playlist.id !== action.payload
      );
    },
    updatePlaylist(state, action: PayloadAction<Playlist>) {
      const idToUpdate = action.payload.id;
      state.playlists = state.playlists.map((playlist) =>
        playlist.id === idToUpdate ? action.payload : playlist
      );
    },
    setLastPlaylistAddedTo(state, action: PayloadAction<string>) {
      //takes an id of the last playlist added to and finds the playlist it corresponds to
      const lastPlaylistAddedTo = state.playlists.find(
        (playlist) => playlist.id === action.payload
      );
      if (!lastPlaylistAddedTo) return;

      state.lastPlaylistAddedTo = lastPlaylistAddedTo;
    },
    setPlaylistSortOption(state, action: PayloadAction<string>) {
      state.playlistSortOption = action.payload;
    },
  },
});

// Export each reducers function defined in createSlice
export const {
  setSelectedPlaylistId,
  setPlaylists,
  addPlaylist,
  deletePlaylist,
  updatePlaylist,
  setLastPlaylistAddedTo,
  setPlaylistSortOption,
} = playlistSlice.actions;

// Export default the slice reducer
export default playlistSlice.reducer;
