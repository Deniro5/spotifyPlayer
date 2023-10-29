import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  removeTracksFromDisplay,
  setLastPlaylistAddedTo,
  setQueueTracks,
  setSelectedTracksHash,
  setTracksManuallyAddedToQueue,
} from "../redux/slices/playerSlice";
import {
  getAccessToken,
  getQueueTracks,
  getSelectedPlaylistId,
  getTracksManuallyAddedToQueue,
} from "../redux/slices/selectors";
import useToast from "./useToast";
import { Track } from "../types";

const useTrackActions = (trackIds: (string | null)[]) => {
  const accessToken = useAppSelector(getAccessToken);
  const selectedPlaylistId = useAppSelector(getSelectedPlaylistId);
  const { setToastHelper, setErrorHelper } = useToast();
  const dispatch = useAppDispatch();
  const queue = useAppSelector(getQueueTracks);
  const tracksManuallyAddedToQueue = useAppSelector(getTracksManuallyAddedToQueue);

  //Note that for add we are using the passed playlist and for remove we are using the selectedPlaylist
  const addTracks = (playlistId: string) => {
    if (!playlistId || !trackIds.length) return;
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ uris: trackIds }),
    })
      .then((res) => {
        if (res.status !== 201) return;
        dispatch(setLastPlaylistAddedTo(playlistId));
        setToastHelper("Successfully added to playlist");
      })
      .catch((err) => {
        console.log(err);
        setErrorHelper("Something went wrong. Please try again");
      })
      .finally(() => dispatch(setSelectedTracksHash({})));
  };

  const formatTracksForRemoveRequest = () =>
    trackIds.map((trackId) => {
      return { uri: trackId };
    });

  const removeTracks = () => {
    if (!selectedPlaylistId || !trackIds.length) return;
    fetch(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ tracks: formatTracksForRemoveRequest() }),
    })
      .then((res) => {
        if (res.status !== 200) return;
        dispatch(removeTracksFromDisplay(trackIds));
        setToastHelper("Successfully removed from playlist");
      })
      .catch((err) => {
        console.log(err);
        setErrorHelper("Something went wrong. Please try again");
      })
      .finally(() => dispatch(setSelectedTracksHash({})));
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
        setToastHelper(`${track.name} added to queue`);
      })
      .catch((err) => {
        console.log(err);
        setErrorHelper("Something went wrong. Please try again");
      });
  };

  return { addTracks, removeTracks, addToQueue };
};

export default useTrackActions;
