import { useAppSelector } from "../../hooks";
import Playlist from "../Playlist";
import LikedSongs from "../LikedSongs";
import SearchPage from "../SearchPage";
import Home from "../Home";
import { View } from "../../types";
import { getCurrentView } from "../../redux/selectors";
import RecentSongs from "../RecentSongs";

const routerMap = {
  [View.HOME]: <Home />,
  [View.BROWSE]: <SearchPage />,
  [View.LIKED_SONGS]: <LikedSongs />,
  [View.RECENT_SONGS]: <RecentSongs />,
  [View.PLAYLIST]: <Playlist />,
};

const Router = ({}) => {
  const currentView = useAppSelector(getCurrentView);
  return routerMap[currentView];
};

export default Router;
