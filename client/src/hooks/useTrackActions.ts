import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  removeTracksFromDisplay,
  setLastPlaylistAddedTo,
  setSelectedTracksHash,
} from "../redux/slices/playerSlice";
import { getAccessToken, getSelectedPlaylistId } from "../redux/slices/selectors";

const useTrackActions = (trackIds: (string | null)[]) => {
  const accessToken = useAppSelector(getAccessToken);
  const selectedPlaylistId = useAppSelector(getSelectedPlaylistId);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

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
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
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
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
      })
      .finally(() => dispatch(setSelectedTracksHash({})));
  };

  return { addTracks, removeTracks, errorMessage };
};

export default useTrackActions;
