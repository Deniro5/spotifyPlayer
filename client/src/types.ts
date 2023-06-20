import { Moment } from "moment";

export enum View {
  HOME = "Home",
  BROWSE = "Browse",
  LIKED_SONGS = "Liked Songs",
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
  title: string;
  uri: string;
  albumUrl: string;
  duration: number;
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
