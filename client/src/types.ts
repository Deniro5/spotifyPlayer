import { Moment } from "moment";

export enum View {
  BROWSE = "Browse",
  LIKED_SONGS = "Liked Songs",
  PLAYLIST = "Playlist",
}

export interface Playlist {
  id: string;
  name: string;
  tracks: { href: string; total: string };
}

export interface Track {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
  duration: number;
}

export interface UserImage {
  height: number | null;
  width: number | null;
  url: string;
}

export interface User {
  display_name: string;
  email: string;
  images: UserImage[];
  uri: string;
  id: string;
}

export interface PlaylistDetails {
  name: string;
  description: string;
  isPublic: boolean;
}
