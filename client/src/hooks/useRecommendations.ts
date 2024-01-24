import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setRecommendedTracks } from "../redux/slices/PlayerSlice/playerSlice";
import { uriToId } from "../utils";
import {
  getAccessToken,
  getPlayingTrack,
  getRecommendationSettings,
  getShouldUseRecommendationSliders,
} from "../redux/selectors";

const useRecommendations = () => {
  const accessToken = useAppSelector(getAccessToken);
  const playingTrack = useAppSelector(getPlayingTrack);
  const shouldUseRecommendationSliders = useAppSelector(
    getShouldUseRecommendationSliders
  );
  const recommendationSettings = useAppSelector(getRecommendationSettings);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken || !playingTrack) return;

    setIsFetching(true);

    const fetchUrl = shouldUseRecommendationSliders
      ? `https://api.spotify.com/v1/recommendations?limit=10&target_popularity=${
          recommendationSettings.popularity
        }&target_tempo=${
          recommendationSettings.tempo
        }&target_instrumentalness=${
          recommendationSettings.instrumentalness / 100
        }&target_valence=${
          recommendationSettings.valence / 100
        }&seed_tracks=${uriToId(playingTrack.uri)}`
      : `https://api.spotify.com/v1/recommendations?limit=9&seed_tracks=${uriToId(
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
          const filteredTracks = data.tracks
            .filter(
              (track: SpotifyApi.TrackObjectFull) =>
                track.uri !== playingTrack.uri
            )
            .slice(0, 6);
          dispatch(
            setRecommendedTracks(
              filteredTracks.map((track: SpotifyApi.TrackObjectFull) => {
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
  }, [
    dispatch,
    accessToken,
    playingTrack,
    shouldUseRecommendationSliders,
    recommendationSettings,
  ]);

  return {
    isFetching,
    errorMessage,
  };
};

export default useRecommendations;
