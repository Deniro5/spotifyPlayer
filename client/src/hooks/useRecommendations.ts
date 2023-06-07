import { useState, useEffect, useMemo } from "react";
import { FETCH_LIMIT } from "../constants";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setRecommendedTracks } from "../redux/slices/playerSlice";
import { uriToId } from "../utils";
import { Track } from "../types";

const useRecommendations = () => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken || !playingTrack) return;
    setIsFetching(true);
    const fetchUrl = `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${uriToId(
      playingTrack.uri
    )}`;
    fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.tracks) {
          dispatch(
            setRecommendedTracks(
              data.tracks.map((item: any) => {
                //fix the item: any
                return {
                  artist: item.artists[0]?.name,
                  title: item.name,
                  uri: item.uri,
                  albumUrl: item.album?.images[0]?.url,
                  duration: item.duration_ms,
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
  }, [accessToken, playingTrack]);

  return {
    isFetching,
  };
};

export default useRecommendations;
