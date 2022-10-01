import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { removeTrackFromDisplay } from "../redux/slices/playerSlice";

const useTrackActions = (trackId: string | null) => {
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const playlistId = useAppSelector((state) => state.player.selectedPlaylistId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const removeTrack = () => {
    if (!playlistId || !trackId) return;
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
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

  return { removeTrack, errorMessage };
};

export default useTrackActions;
