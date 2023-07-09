import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setRecommendedTracks } from "../redux/slices/playerSlice";
import { uriToId } from "../utils";

const useRecommendations = () => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const shouldUseRecommendationSliders = useAppSelector(
    (state) => state.player.shouldUseRecommendationSliders
  );
  const recommendationSettings = useAppSelector(
    (state) => state.player.recommendationSettings
  );
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken || !playingTrack) return;

    setIsFetching(true);

    const fetchUrl = shouldUseRecommendationSliders
      ? `https://api.spotify.com/v1/recommendations?limit=10&target_popularity=${
          recommendationSettings.popularity
        }&target_tempo=${recommendationSettings.tempo}&target_instrumentalness=${
          recommendationSettings.instrumentalness / 100
        }&target_valence=${recommendationSettings.valence / 100}&seed_tracks=${uriToId(
          playingTrack.uri
        )}`
      : `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${uriToId(
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
              data.tracks.map((track: SpotifyApi.TrackObjectFull) => {
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
