import { useState, useEffect, useMemo } from "react";
import { FETCH_LIMIT } from "../constants";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setCurrentDisplayTracks } from "../redux/slices/playerSlice";

const useFetchSearchSongs = () => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const search = useAppSelector((state) => state.player.search);
  const currentDisplayTracks = useAppSelector(
    (state) => state.player.currentDisplayTracks
  );

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
              tracks: data.tracks.items.map((track: any) => {
                //fix the item: any
                return {
                  artist: track.artists[0]?.name,
                  title: track.name,
                  uri: track.uri,
                  albumUrl: track.album?.images[0]?.url,
                  albumName: track.album?.name,
                  duration: track.duration_ms,
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
