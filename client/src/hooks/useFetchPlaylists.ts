import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { getAccessToken } from "../redux/slices/selectors";
import { setPlaylists } from "../redux/slices/playerSlice";
import { Playlist } from "../types";

const useFetchPlaylists = () => {
  const accessToken = useAppSelector(getAccessToken);

  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!accessToken) return;
    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          dispatch(
            setPlaylists(
              data.items.map((playlist: Playlist) => {
                return {
                  id: playlist.id,
                  name: playlist.name,
                  tracks: playlist.tracks,
                  description: playlist.description,
                  images: playlist.images,
                };
              })
            )
          );
        }
      })
      .catch((err) => {
        setErrorMessage("Unable to fetch playlists");
        console.log(err);
      })
      .finally(() => setIsFetching(false));
  }, [dispatch, accessToken]);

  return {
    isFetching,
    errorMessage,
  };
};

export default useFetchPlaylists;
