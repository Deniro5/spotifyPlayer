import React from "react";
import { useAppSelector } from "../../hooks";
import Playlist from "../Playlist";
import LikedSongs from "../LikedSongs";
import SearchPage from "../SearchPage";
import { View } from "../../types";

const routerMap = {
  [View.BROWSE]: <SearchPage />,
  [View.LIKED_SONGS]: <LikedSongs />,
  [View.PLAYLIST]: <Playlist />,
};

const Router = ({}) => {
  const currentView = useAppSelector((state) => state.player.currentView);
  return routerMap[currentView];
};

export { Router };
