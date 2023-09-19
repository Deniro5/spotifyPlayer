import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setQueueTracks } from "../redux/slices/playerSlice";
import { getAccessToken, getPlayingTrack, getShuffle } from "../redux/slices/selectors";

const useQueue = () => {
  const accessToken = useAppSelector(getAccessToken);
  const playingTrack = useAppSelector(getPlayingTrack);
  const shuffle = useAppSelector(getShuffle);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken || !playingTrack) return;
    // Get the whole queue and then just return a slice because we need a 'full queue' window
    setIsFetching(true);

    const fetchUrl = `https://api.spotify.com/v1/me/player/queue`;
    fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.queue) {
          //seems to be a race condition somewhere that sometimes puts the playing track at the front of the queue and sometimes doesnt.
          const filteredQueue = data.queue.filter(
            (track: SpotifyApi.TrackObjectFull) => track.uri !== playingTrack.uri
          );
          dispatch(
            setQueueTracks(
              filteredQueue.map((track: SpotifyApi.TrackObjectFull) => {
                const { album, name, uri, duration_ms, artists } = track;
                return {
                  artist: artists[0]?.name,
                  name,
                  uri,
                  albumUrl: album?.images[0]?.url,
                  albumName: album?.name,
                  duration_ms,
                };
              })
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
      })
      .finally(() => setIsFetching(false));
  }, [dispatch, accessToken, shuffle]);

  return {
    isFetching,
    errorMessage,
  };
};

export default useQueue;
