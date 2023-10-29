import { useAppDispatch, useAppSelector } from "../hooks";
import { spotifyApi } from "react-spotify-web-playback";
import {
  getAccessToken,
  getDeviceId,
  getIsPlaying,
  getQueueTracks,
  getTracksManuallyAddedToQueue,
} from "../redux/slices/selectors";
import {
  addSongsStatusHash,
  addTracksToDisplay,
  removeTracksFromDisplay,
  setDontPopQueue,
  setQueueTracks,
  setTracksManuallyAddedToQueue,
} from "../redux/slices/playerSlice";
import { Track } from "../types";
import { uriToId } from "../utils";

const useSpotifyApiActions = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const isPlaying = useAppSelector(getIsPlaying);
  const deviceId = useAppSelector(getDeviceId);

  const play = async (
    index: number | undefined,
    playlistUri: string | undefined,
    trackUri: string | undefined
  ) => {
    if (!accessToken || !deviceId) return;
    //if the user plays a different song the manually added songs in the queue should be
    dispatch(setDontPopQueue(true));
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

  const next = async () => {
    if (!accessToken || !deviceId) return;
    await spotifyApi.next(accessToken);
  };

  const doubleNext = async () => {
    await next();
    await next();
  };

  //probably makes more sense in track actions
  const addLikedSongs = (uris: (string | null)[], isLikedSongs?: boolean) => {
    const idArray = uris.map((uri) => uriToId(uri));
    fetch(`	https://api.spotify.com/v1/me/tracks?ids=${idArray.join(",")}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) return;
        const newSongStatuses = Object.fromEntries(idArray.map((id) => [id, true]));
        dispatch(addSongsStatusHash(newSongStatuses));
        if (isLikedSongs) return; // dispatch(addTracksToDisplay(uris));
      })
      .catch((err) => {
        console.log(err);
        //setErrorMessage("An unexpected error occured");
      });
  };

  //probably makes more sense in track actions
  const removeLikedSongs = (uris: (string | null)[], isLikedSongs?: boolean) => {
    const idArray = uris.map((uri) => uriToId(uri));
    fetch(`	https://api.spotify.com/v1/me/tracks?ids=${idArray.join(",")}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) return;
        const newSongStatuses = Object.fromEntries(idArray.map((id) => [id, false]));
        dispatch(addSongsStatusHash(newSongStatuses));
        if (isLikedSongs) dispatch(removeTracksFromDisplay(uris));
      })
      .catch((err) => {
        console.log(err);
        //setErrorMessage("An unexpected error occured");
      });
  };

  return {
    play,
    pause,
    shuffle,
    next,
    doubleNext,
    addLikedSongs,
    removeLikedSongs,
  };
};

export default useSpotifyApiActions;
