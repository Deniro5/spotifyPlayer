import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { removeTrackFromDisplay } from "../redux/slices/playerSlice";

const useTrackActions = (trackId: string | null) => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const selectedPlaylistId = useAppSelector((state) => state.player.selectedPlaylistId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  //Note that for add we are using the passed playlist and for remove we are using the selectedPlaylist
  const addTrack = (playlistId: string) => {
    if (!playlistId || !trackId) return;
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ uris: [trackId] }),
    })
      .then((res) => {
        if (res.status !== 200) return;
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
      });
  };

  const removeTrack = () => {
    if (!selectedPlaylistId || !trackId) return;
    fetch(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ tracks: [{ uri: trackId }] }),
    })
      .then((res) => {
        if (res.status !== 200) return;
        dispatch(removeTrackFromDisplay(trackId));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
      });
  };

  return { addTrack, removeTrack, errorMessage };
};

export default useTrackActions;
