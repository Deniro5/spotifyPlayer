import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { getAccessToken } from "../redux/slices/PlayerSlice/selectors";
import { Playlist } from "../types";
import useToast from "./useToast";
import { setPlaylists } from "../redux/slices/PlaylistSlice/playlistSlice";

const useFetchPlaylists = () => {
  const accessToken = useAppSelector(getAccessToken);

  const [isFetching, setIsFetching] = useState(true);
  const { setErrorHelper } = useToast();
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
                  owner: playlist.owner,
                };
              })
            )
          );
        }
      })
      .catch(() => {
        setErrorHelper("Unable to fetch playlists. Please try again.");
      })
      .finally(() => setIsFetching(false));
  }, [dispatch, accessToken]);

  return {
    isFetching,
  };
};

export default useFetchPlaylists;
