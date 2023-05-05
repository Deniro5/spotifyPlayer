/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Playlist, PlaylistSortOptions, User, View } from "../../types";
import { Track } from "../../types";

// Define the state of the slice as an object
export interface PlayerState {
  accessToken: string | null;
  search: string;
  selectedPlaylistId: string | null;
  playlists: Playlist[];
  currentView: View;
  currentDisplayTracks: Track[];
  playingTrack: Track | null;
  currentUser: User | null;
  selectedTracksHash: Record<string, boolean>;
  lastPlaylistAddedTo: Playlist | null;
  showSuggestionSection: boolean;
  playlistSortOption: string;
  shuffle: boolean;
}

// Define an initial state
const initialState: PlayerState = {
  accessToken: null,
  search: "",
  selectedPlaylistId: null,
  playlists: [],
  currentView: View.HOME,
  currentDisplayTracks: [],
  playingTrack: null,
  currentUser: null,
  selectedTracksHash: {},
  lastPlaylistAddedTo: null,
  showSuggestionSection: true,
  playlistSortOption: PlaylistSortOptions.MOST_RECENT,
  shuffle: false,
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
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
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
    setCurrentView(state, action: PayloadAction<View>) {
      state.currentView = action.payload;
    },
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
    setPlayingTrack(state, action: PayloadAction<Track | null>) {
      state.playingTrack = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
    setSelectedTracksHash(state, action: PayloadAction<Record<string, boolean>>) {
      state.selectedTracksHash = action.payload;
    },
    addSelectedTrack(state, action: PayloadAction<string>) {
      state.selectedTracksHash[action.payload] = true;
    },
    removeSelectedTrack(state, action: PayloadAction<string>) {
      delete state.selectedTracksHash[action.payload];
    },
    setLastPlaylistAddedTo(state, action: PayloadAction<string>) {
      //takes an id of the last playlist added to and finds the playlist it corresponds to
      const lastPlaylistAddedTo = state.playlists.find(
        (playlist) => playlist.id === action.payload
      );
      if (!lastPlaylistAddedTo) return;

      state.lastPlaylistAddedTo = lastPlaylistAddedTo;
    },
    setSuggestionSection(state, action: PayloadAction<boolean>) {
      state.showSuggestionSection = action.payload;
    },
    setPlaylistSortOption(state, action: PayloadAction<string>) {
      state.playlistSortOption = action.payload;
    },
    setShuffle(state, action: PayloadAction<boolean>) {
      state.shuffle = action.payload;
    },
  },
});

// Export each reducers function defined in createSlice
export const {
  setAccessToken,
  setSearch,
  setSelectedPlaylistId,
  setPlaylists,
  addPlaylist,
  deletePlaylist,
  updatePlaylist,
  setCurrentView,
  setCurrentDisplayTracks,
  removeTracksFromDisplay,
  setPlayingTrack,
  setCurrentUser,
  setSelectedTracksHash,
  addSelectedTrack,
  removeSelectedTrack,
  setLastPlaylistAddedTo,
  setSuggestionSection,
  setPlaylistSortOption,
  setShuffle,
} = playerSlice.actions;

// Export default the slice reducer
export default playerSlice.reducer;
