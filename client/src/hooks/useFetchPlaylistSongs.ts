import { useState, useEffect } from "react";
import { FETCH_LIMIT } from "../constants";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setCurrentDisplayTracks } from "../redux/slices/playerSlice";
import {
  getAccessToken,
  getSelectedPlaylistId,
} from "../redux/slices/selectors";
import useFetchLikedStatus from "./useFetchLikedStatus";
import { uriToId } from "../utils";
import useToast from "./useToast";

const useFetchPlaylistSongs = () => {
  const accessToken = useAppSelector(getAccessToken);
  const selectedPlaylistId = useAppSelector(getSelectedPlaylistId);
  const { getLikedStatus } = useFetchLikedStatus();
  const { setErrorHelper } = useToast();

  const [fetchUrl, setFetchUrl] = useState<string | null>(null);
  const [isFetchingInitial, setIsFetchingInitial] = useState(false);
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
          const filteredTracks = data.items.filter(
            //If there is a non song item in the playlist we have to filter it out
            (item: { track: SpotifyApi.TrackObjectFull }) => item.track?.uri
          );
          dispatch(
            setCurrentDisplayTracks({
              tracks: filteredTracks.map(
                (item: { track: SpotifyApi.TrackObjectFull }) => {
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
                }
              ),
              isInitialLoad: isFetchingInitial,
            })
          );
          const trackIds = filteredTracks.map(
            (item: { track: SpotifyApi.TrackObjectFull }) =>
              uriToId(item.track.uri)
          );
          getLikedStatus(trackIds);
          setFetchUrl(data.next);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorHelper("Something went wrong. Please try again");
      })
      .finally(() => setIsFetchingInitial(false));
  };

  //For the initial load after playlistId change
  useEffect(() => {
    if (!accessToken || !selectedPlaylistId || !isFetchingInitial) return;
    loadMoreTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, isFetchingInitial]);

  return {
    isFetchingInitial,
    loadMoreTracks,
  };
};

export default useFetchPlaylistSongs;
