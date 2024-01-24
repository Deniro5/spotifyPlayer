import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const getRootState = (state: RootState) => state;

export const getSelectedPlaylistId = createSelector(
  [getRootState],
  (state) => state.playlist.selectedPlaylistId
);

export const getPlaylists = createSelector(
  [getRootState],
  (state) => state.playlist.playlists
);

export const getPlaylistById = (playlistId: String | null) =>
  createSelector([getRootState], (state) =>
    state.playlist.playlists.find((playlist) => playlist.id === playlistId)
  );

export const getSelectedPlaylist = createSelector([getRootState], (state) =>
  state.playlist.playlists.find(
    (playlist) => state.playlist.selectedPlaylistId === playlist.id
  )
);

export const getLastPlaylistAddedTo = createSelector(
  [getRootState],
  (state) => state.playlist.lastPlaylistAddedTo
);

export const getPlaylistSortOption = createSelector(
  [getRootState],
  (state) => state.playlist.playlistSortOption
);
