import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setCurrentDisplayTracks } from "../redux/slices/playerSlice";

const useFetchRecentSongs = () => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const removeDuplicateTracksFromArray = (
    arr: { track: SpotifyApi.TrackObjectFull }[]
  ) => {
    const found: Record<string, boolean> = {};
    const res: SpotifyApi.TrackObjectFull[] = [];
    arr.forEach((item) => {
      const { track } = item;
      if (!found[track.uri]) {
        found[track.uri] = true;
        res.push(track);
      }
    });
    return res;
  };

  useEffect(() => {
    if (!accessToken || errorMessage) return;

    const fetchUrl = `https://api.spotify.com/v1/me/player/recently-played?limit=50`;
    fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const uniqueTracks = removeDuplicateTracksFromArray(data.items).slice(0, 25);
          dispatch(
            setCurrentDisplayTracks({
              tracks: uniqueTracks.map((track: SpotifyApi.TrackObjectFull) => {
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
              isInitialLoad: true,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
      });
  }, [dispatch, accessToken, errorMessage]);

  return {
    errorMessage,
  };
};

export default useFetchRecentSongs;
