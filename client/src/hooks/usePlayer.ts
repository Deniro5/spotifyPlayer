import { useAppDispatch, useAppSelector } from "../hooks";
import { setShuffle } from "../redux/slices/playerSlice";
import { getAccessToken, getShuffle } from "../redux/slices/selectors";

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
      .then((data) => {
        console.log(data);
        dispatch(setShuffle(newShuffle));
      })
      .catch((err) => console.log(err));
  };

  return { toggleShuffle };
};

export default usePlayer;
