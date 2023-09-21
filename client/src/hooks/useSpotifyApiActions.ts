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
  const queue = useAppSelector(getQueueTracks);
  const tracksManuallyAddedToQueue = useAppSelector(getTracksManuallyAddedToQueue);

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

  const addToQueue = async (track: Track | null) => {
    if (!accessToken || !track) return;

    fetch(` https://api.spotify.com/v1/me/player/queue/?uri=${track.uri}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    })
      .then(() => {
        if (tracksManuallyAddedToQueue.length === 0) {
          dispatch(setQueueTracks([track, ...queue]));
        } else if (tracksManuallyAddedToQueue.length === 1) {
          let newQueueTracks = [...queue];
          newQueueTracks.splice(1, 0, track);
          dispatch(setQueueTracks(newQueueTracks));
        }

        dispatch(setTracksManuallyAddedToQueue([...tracksManuallyAddedToQueue, track]));
      })
      .catch((err) => {
        console.log(err);
        // console.log(err);
        // setErrorMessage("An unexpected error occured");
      });
    // .finally(() => dispatch(setSelectedTracksHash({})));
  };

  const removeLikedSongs = (uris: (string | null)[]) => {
    const idArray = uris.map((uri) => uriToId(uri));
    fetch(`	https://api.spotify.com/v1/me/tracks?ids=${idArray.join(",")}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      //body: JSON.stringify({ ids: uris }),
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) return;
        dispatch(removeTracksFromDisplay(uris));
      })
      .catch((err) => {
        console.log(err);
        //setErrorMessage("An unexpected error occured");
      });
  };

  return { play, pause, shuffle, next, doubleNext, addToQueue, removeLikedSongs };
};

export default useSpotifyApiActions;
