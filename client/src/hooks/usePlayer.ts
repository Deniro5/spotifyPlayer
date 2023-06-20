import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setShuffle } from "../redux/slices/playerSlice";

const usePlayer = () => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const dispatch = useAppDispatch();
  const shuffle = useAppSelector((state) => state.player.shuffle);

  useEffect(() => {
    if (!accessToken) return;
    fetch("https://api.spotify.com/v1/me/player", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.shuffle_state) dispatch(setShuffle(data.shuffle_state));
      })
      .catch((err) => console.log(err));
  }, [accessToken]);

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
