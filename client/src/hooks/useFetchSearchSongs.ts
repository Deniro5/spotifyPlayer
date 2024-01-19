import { useState, useEffect, useMemo } from "react";
import { FETCH_LIMIT } from "../constants";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setCurrentDisplayTracks } from "../redux/slices/playerSlice";
import {
  getAccessToken,
  getCurrentDisplayTracks,
  getSearch,
} from "../redux/slices/selectors";
import { uriToId } from "../utils";
import useFetchLikedStatus from "./useFetchLikedStatus";
import useToast from "./useToast";

const useFetchSearchSongs = () => {
  const accessToken = useAppSelector(getAccessToken);
  const search = useAppSelector(getSearch);
  const { setErrorHelper } = useToast();
  const currentDisplayTracks = useAppSelector(getCurrentDisplayTracks);
  const { getLikedStatus } = useFetchLikedStatus();

  const [nextFetchUrl, setNextFetchUrl] = useState<string | null>(null);
  const [isFetchingInitial, setIsFetchingInitial] = useState(false);
  const dispatch = useAppDispatch();

  //after we have a new search term we need to restart the fetch
  useEffect(() => {
    if (!accessToken || !search.length) return;
    loadTracks({ isInitialLoad: true });
    setIsFetchingInitial(true);
  }, [search, accessToken]);

  const loadTracks = ({ isInitialLoad }: { isInitialLoad: boolean }) => {
    const fetchUrl = isInitialLoad
      ? `https://api.spotify.com/v1/search?q=${search}&type=track&limit=${FETCH_LIMIT}`
      : nextFetchUrl;
    if (!accessToken || !fetchUrl) return;

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
              tracks: data.tracks.items.map(
                (track: SpotifyApi.TrackObjectFull) => {
                  const { album, name, uri, duration_ms, artists } = track;
                  return {
                    artist: artists[0]?.name,
                    name,
                    uri,
                    albumUrl: album?.images[0]?.url,
                    albumName: album?.name,
                    duration_ms,
                  };
                }
              ),
              isInitialLoad,
            })
          );
          const trackIds = data.tracks.items.map(
            (track: SpotifyApi.TrackObjectFull) => uriToId(track?.uri || "")
          );
          getLikedStatus(trackIds);
          setNextFetchUrl(data.tracks?.next);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorHelper("Something went wrong. Please Try Again");
      })
      .finally(() => setIsFetchingInitial(false));
  };

  const loadMoreTracks = () => loadTracks({ isInitialLoad: false });

  const noSearchTermEntered = useMemo(() => !search.length, [search]);

  const noResults = useMemo(
    () => !noSearchTermEntered && currentDisplayTracks.length === 0,
    [noSearchTermEntered, currentDisplayTracks]
  );

  return {
    isFetchingInitial,
    loadMoreTracks,
    noResults,
    noSearchTermEntered,
  };
};

export default useFetchSearchSongs;
