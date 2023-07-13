import { useAppSelector } from "../hooks";
import { spotifyApi } from "react-spotify-web-playback";
import { getAccessToken, getDeviceId, getIsPlaying } from "../redux/slices/selectors";

const useSpotifyApiActions = () => {
  const accessToken = useAppSelector(getAccessToken);
  const isPlaying = useAppSelector(getIsPlaying);
  const deviceId = useAppSelector(getDeviceId);

  const play = async (
    index: number | undefined,
    playlistUri: string | undefined,
    trackUri: string | undefined
  ) => {
    if (!accessToken || !deviceId) return;

    await spotifyApi.play(accessToken, {
      deviceId,
      offset: index,
      context_uri: playlistUri || undefined,
      uris: trackUri ? [trackUri] : undefined,
    });
  };

  const pause = async () => {
    if (!accessToken || !deviceId) return;

    if (isPlaying) {
      await spotifyApi.pause(accessToken, deviceId);
    } else {
      await spotifyApi.play(accessToken, { deviceId });
    }
  };

  const shuffle = async (newShuffleState: boolean) => {
    if (!accessToken || !deviceId) return;

    await spotifyApi.shuffle(accessToken, newShuffleState, deviceId);
  };

  return { play, pause, shuffle };
};

export default useSpotifyApiActions;
