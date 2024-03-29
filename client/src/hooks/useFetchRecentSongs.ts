import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { uriToId } from "../utils";
import useFetchLikedStatus from "./useFetchLikedStatus";
import useToast from "./useToast";
import { setCurrentDisplayTracks } from "../redux/slices/TrackSlice/trackSlice";
import { setTotalRecentSongs } from "../redux/slices/AppSlice/appSlice";

const useFetchRecentSongs = () => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const [isFetching, setIsFetching] = useState(false);
  const { setErrorHelper } = useToast();
  const { getLikedStatus } = useFetchLikedStatus();
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
    if (!accessToken) return;
    setIsFetching(true);
    const fetchUrl = `https://api.spotify.com/v1/me/player/recently-played?limit=25`;
    fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const uniqueTracks = removeDuplicateTracksFromArray(data.items);
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
          dispatch(setTotalRecentSongs(uniqueTracks.length));
          const trackIds = data.items.map(
            (item: { track: SpotifyApi.TrackObjectFull }) =>
              uriToId(item.track.uri)
          );
          getLikedStatus(trackIds);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorHelper("Something went wrong. Please try again");
      })
      .finally(() => setIsFetching(false));
  }, [dispatch, accessToken]);

  return {
    isFetching,
  };
};

export default useFetchRecentSongs;
