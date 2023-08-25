import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { deletePlaylist } from "../redux/slices/playerSlice";
import { PlaylistDetails } from "../types";
import { getAccessToken } from "../redux/slices/selectors";

const usePlaylistActions = (playlistId: string | null) => {
  const accessToken = useAppSelector(getAccessToken);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handlePlaylistDelete = () => {
    if (!playlistId) return;
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) return;
        dispatch(deletePlaylist(playlistId));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
      });
  };

  const handleRenamePlaylist = (playlistDetails: PlaylistDetails) => {
    if (!playlistId) return;

    const { name, description } = playlistDetails;
    fetch(`	https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => res.json())
      .then((data) => {
        //we need to put the response back
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
      });
  };

  const handleMoveTrack = (sourceIndex: number, destinationIndex: number) => {
    if (!playlistId) return;

    fetch(`	https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ range_start: sourceIndex, insert_before: destinationIndex }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An unexpected error occured");
      });
  };

  return { handleRenamePlaylist, handlePlaylistDelete, handleMoveTrack, errorMessage };
};

export default usePlaylistActions;
