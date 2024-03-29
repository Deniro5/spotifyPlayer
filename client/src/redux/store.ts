import { configureStore } from "@reduxjs/toolkit";

// Import the previously created search slice
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import playerSliceReducer from "./slices/PlayerSlice/playerSlice";
import appSliceReducer from "./slices/AppSlice/appSlice";
import playlistSliceReducer from "./slices/PlaylistSlice/playlistSlice";
import TrackSliceReducer from "./slices/TrackSlice/trackSlice";

// Create the store, adding the search slice to it
export const store = configureStore({
  reducer: {
    app: appSliceReducer,
    player: playerSliceReducer,
    track: TrackSliceReducer,
    playlist: playlistSliceReducer,
  },
});

// Export some helper types used to improve type-checking
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
