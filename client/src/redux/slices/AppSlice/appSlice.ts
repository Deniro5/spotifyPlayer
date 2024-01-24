/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecommendationSettings, ToastType, User, View } from "../../../types";

// Define the state of the slice as an object
export interface AppState {
  search: string;
  currentView: View;
  totalLikedSongs: number;
  totalRecentSongs: number;
  currentUser: User | null;
  showSuggestionSection: boolean;
  showRecommendations: boolean;
  shouldUseRecommendationSliders: boolean;
  recommendationSettings: RecommendationSettings;
  toast: { message: string; type: ToastType; duration?: number } | null;
}

// Define an initial state
const initialState: AppState = {
  search: "",
  currentView: View.HOME,
  totalLikedSongs: 0,
  totalRecentSongs: 0,
  currentUser: null,
  showSuggestionSection: true,
  showRecommendations: true,
  shouldUseRecommendationSliders: true,
  recommendationSettings: {
    popularity: 50,
    tempo: 70,
    valence: 50,
    instrumentalness: 50,
  },
  toast: null,
};

// Create a slice containing the configuration of the state
// and the reducers functions
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCurrentView(state, action: PayloadAction<View>) {
      state.currentView = action.payload;
    },
    setTotalLikedSongs(state, action: PayloadAction<number>) {
      state.totalLikedSongs = action.payload;
    },
    setTotalRecentSongs(state, action: PayloadAction<number>) {
      state.totalRecentSongs = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
    setSuggestionSection(state, action: PayloadAction<boolean>) {
      state.showSuggestionSection = action.payload;
    },
    setShowRecommendations(state, action: PayloadAction<boolean>) {
      state.showRecommendations = action.payload;
    },
    setShouldUseRecommendationSliders(state, action: PayloadAction<boolean>) {
      state.shouldUseRecommendationSliders = action.payload;
    },
    setRecommendationSettings(
      state,
      action: PayloadAction<RecommendationSettings>
    ) {
      state.recommendationSettings = action.payload;
    },
    setToast(
      state,
      action: PayloadAction<{
        message: string;
        type: ToastType;
        duration?: number;
      } | null>
    ) {
      state.toast = action.payload;
    },
  },
});

// Export each reducers function defined in createSlice
export const {
  setSearch,
  setCurrentView,
  setTotalLikedSongs,
  setTotalRecentSongs,
  setCurrentUser,
  setSuggestionSection,
  setShowRecommendations,
  setShouldUseRecommendationSliders,
  setRecommendationSettings,
  setToast,
} = appSlice.actions;

// Export default the slice reducer
export default appSlice.reducer;
