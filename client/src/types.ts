import { Moment } from "moment";
export enum ToastType {
  MESSAGE = "message",
  ERROR = "error",
}
export enum View {
  HOME = "Home",
  BROWSE = "Browse",
  LIKED_SONGS = "Liked Songs",
  RECENT_SONGS = "Recently Played",
  PLAYLIST = "Playlist",
}

export interface Image {
  height: number | null;
  width: number | null;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: { href: string; total: string };
  images: Image[];
}

export interface Track {
  artist: string;
  name: string;
  uri: string;
  albumUrl: string;
  albumName: string;
  duration_ms: number;
}

export interface User {
  display_name: string;
  email: string;
  images: Image[];
  uri: string;
  id: string;
}

export interface PlaylistDetails {
  name: string;
  description: string;
}

export enum PlaylistSortOptions {
  ALPHABETICAL = "Alphabetical",
  MOST_RECENT = "Most Recent",
}

export interface RecommendationSettings {
  popularity: number;
  tempo: number;
  instrumentalness: number;
  valence: number;
}
