import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { View } from "../../../types";

const getRootState = (state: RootState) => state;

export const getCurrentUser = createSelector(
  [getRootState],
  (state) => state.app.currentUser
);

export const getSearch = createSelector(
  [getRootState],
  (state) => state.app.search
);

export const getShowSuggestionSection = createSelector(
  [getRootState],
  (state) => state.app.showSuggestionSection
);

export const getShowRecommendations = createSelector(
  [getRootState],
  (state) => state.app.showRecommendations
);

export const getTotalLikedSongs = createSelector(
  [getRootState],
  (state) => state.app.totalLikedSongs
);

export const getTotalRecentSongs = createSelector(
  [getRootState],
  (state) => state.app.totalRecentSongs
);

export const getShouldUseRecommendationSliders = createSelector(
  [getRootState],
  (state) => state.app.shouldUseRecommendationSliders
);

export const getRecommendationSettings = createSelector(
  [getRootState],
  (state) => state.app.recommendationSettings
);

export const getToast = createSelector(
  [getRootState],
  (state) => state.app.toast
);

export const getCurrentView = createSelector(
  [getRootState],
  (state) => state.app.currentView
);

export const getIsRecommendationsView = createSelector(
  [getRootState],
  (state) =>
    state.app.currentView === View.LIKED_SONGS ||
    state.app.currentView === View.RECENT_SONGS ||
    state.app.currentView === View.PLAYLIST ||
    state.app.currentView === View.BROWSE
);
