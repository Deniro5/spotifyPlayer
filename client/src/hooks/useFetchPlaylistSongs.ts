import { useState, useEffect } from "react";
import { FETCH_LIMIT } from "../constants";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setCurrentDisplayTracks } from "../redux/slices/playerSlice";

const useFetchPlaylistSongs = () => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const selectedPlaylistId = useAppSelector((state) => state.player.selectedPlaylistId);

  const [fetchUrl, setFetchUrl] = useState<string | null>(null);
  const [isFetchingInitial, setIsFetchingInitial] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  //after we have a new playlist id we need to restart the fetch
  useEffect(() => {
    if (selectedPlaylistId) {
      setFetchUrl(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks?offset=0&limit=${FETCH_LIMIT}`
      );
      setIsFetchingInitial(true);
    }
  }, [selectedPlaylistId]);

  const loadMoreTracks = () => {
    if (!fetchUrl || !accessToken || !selectedPlaylistId) return;

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

  //For the initial load after playlistId change
  useEffect(() => {
    if (!accessToken || errorMessage || !selectedPlaylistId || !isFetchingInitial) return;
    loadMoreTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, errorMessage, isFetchingInitial]);

  return {
    isFetchingInitial,
    loadMoreTracks,
    errorMessage,
  };
};

export default useFetchPlaylistSongs;
