import { useState, useEffect, useCallback } from "react";
import { FETCH_LIMIT } from "../constants";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setCurrentDisplayTracks } from "../redux/slices/playerSlice";

const useFetchLikedSongs = () => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const [fetchUrl, setFetchUrl] = useState<string | null>(
    `https://api.spotify.com/v1/me/tracks?offset=0&limit=${FETCH_LIMIT}`
  );
  const [isFetchingInitial, setIsFetchingInitial] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const loadMoreTracks = () => {
    if (!fetchUrl || !accessToken) return;

    fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          dispatch(
            setCurrentDisplayTracks({
              tracks: data.items.map((item: { track: SpotifyApi.TrackObjectFull }) => {
                const { track } = item;
                const { album, name, uri, duration_ms, artists } = track;
                return {
                  artist: artists[0]?.name,
                  name,
                  uri,
                  albumUrl: album?.images[0]?.url,
                  albumName: album?.name,
                  duration_ms,
                };
              }),
              isInitialLoad: isFetchingInitial,
            })
          );
          setFetchUrl(data.next);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
      })
      .finally(() => setIsFetchingInitial(false));
  };

  //For the initial load after username change
  useEffect(() => {
    if (!accessToken || errorMessage) return;
    loadMoreTracks();
  }, [accessToken, errorMessage]);

  return {
    isFetchingInitial,
    loadMoreTracks,
    errorMessage,
  };
};

export default useFetchLikedSongs;
