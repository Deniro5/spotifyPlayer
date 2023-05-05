import { useAppSelector } from "../hooks";

const usePlayer = () => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const shuffle = useAppSelector((state) => state.player.shuffle);

  const toggleShuffle = () => {
    if (!accessToken) return;
    fetch("https://api.spotify.com/v1/me/player/shuffle?state=true", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return { toggleShuffle };
};

export default usePlayer;
