import { useAppDispatch, useAppSelector } from "../hooks";
import { setShuffle } from "../redux/slices/PlayerSlice/playerSlice";
import {
  getAccessToken,
  getShuffle,
} from "../redux/slices/PlayerSlice/selectors";

const usePlayer = () => {
  const accessToken = useAppSelector(getAccessToken);
  const shuffle = useAppSelector(getShuffle);
  const dispatch = useAppDispatch();

  const toggleShuffle = () => {
    if (!accessToken) return;
    const newShuffle = !shuffle;
    fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${newShuffle}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        dispatch(setShuffle(newShuffle));
      })
      .catch((err) => console.log(err));
  };

  return { toggleShuffle };
};

export default usePlayer;
