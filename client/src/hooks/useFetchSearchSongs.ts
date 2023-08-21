import { useState, useEffect, useMemo } from "react";
import { FETCH_LIMIT } from "../constants";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setCurrentDisplayTracks } from "../redux/slices/playerSlice";
import {
  getAccessToken,
  getCurrentDisplayTracks,
  getSearch,
} from "../redux/slices/selectors";

const useFetchSearchSongs = () => {
  const accessToken = useAppSelector(getAccessToken);
  const search = useAppSelector(getSearch);
  const currentDisplayTracks = useAppSelector(getCurrentDisplayTracks);

  const [fetchUrl, setFetchUrl] = useState<string | null>(null);
  const [isFetchingInitial, setIsFetchingInitial] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  //after we have a new search term we need to restart the fetch
  useEffect(() => {
    if (search.length) {
      setFetchUrl(
        `https://api.spotify.com/v1/search?q=${search}&type=track&limit=${FETCH_LIMIT}`
      );
      setIsFetchingInitial(true);
    }
  }, [search]);

  const loadMoreTracks = () => {
    if (!fetchUrl || !accessToken || !search.length) return;

    fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.tracks?.items) {
          dispatch(
            setCurrentDisplayTracks({
              tracks: data.tracks.items.map((track: SpotifyApi.TrackObjectFull) => {
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
          setFetchUrl(data.tracks?.next);
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
    if (!accessToken || errorMessage || !search.length || !isFetchingInitial) return;
    loadMoreTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, errorMessage, isFetchingInitial]);

  const noSearchTermEntered = useMemo(() => !search.length, [search]);

  const noResults = useMemo(
    () => !noSearchTermEntered && currentDisplayTracks.length === 0,
    [noSearchTermEntered, currentDisplayTracks]
  );

  return {
    isFetchingInitial,
    loadMoreTracks,
    errorMessage,
    noResults,
    noSearchTermEntered,
  };
};

export default useFetchSearchSongs;
