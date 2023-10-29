import { useAppSelector, useAppDispatch } from "../hooks";
import { addPlaylist, deletePlaylist, updatePlaylist } from "../redux/slices/playerSlice";
import { Playlist } from "../types";
import { getAccessToken, getCurrentUser } from "../redux/slices/selectors";
import useToast from "./useToast";

const usePlaylistActions = (playlistId: string | null) => {
  const accessToken = useAppSelector(getAccessToken);
  const currentUser = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();
  const { setToastHelper, setErrorHelper } = useToast();

  const handlePlaylistCreate = (name: string, description: string) => {
    if (!name.length || !currentUser?.id || !accessToken) return;
    fetch(`https://api.spotify.com/v1/users/${currentUser.id}/playlists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => res.json())
      .then((data: Playlist) => {
        const { id, tracks, name, description } = data;
        const newPlaylist = {
          id,
          tracks,
          name,
          description,
          images: [{ url: "placeholder", height: 0, width: 0 }],
        };
        dispatch(addPlaylist(newPlaylist));
        setToastHelper("Playlist successfully created");
      })
      .catch((err) => {
        console.log(err);
        setErrorHelper("Something went wrong. Please try again");
      });
  };

  const handlePlaylistDelete = () => {
    if (!playlistId || !accessToken) return;
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) return;
        dispatch(deletePlaylist(playlistId));
        setToastHelper("Playlist successfully deleted");
      })
      .catch((err) => {
        console.log(err);
        setErrorHelper("Something went wrong. Please try again");
      });
  };

  const handlePlaylistUpdate = (
    playlist: Playlist,
    name: string,
    description: string
  ) => {
    if (!playlist?.id || !accessToken) return;

    const { id } = playlist;
    fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, ...(description.length ? { description } : {}) }),
    })
      .then((res) => {
        if (res.status !== 200) return;
        dispatch(
          updatePlaylist({
            ...playlist,
            name,
            description,
          })
        );
        setToastHelper("Playlist successfully updated");
      })
      .catch((err) => {
        //FIX put this error on the modal and dont close!
        console.log(err);
        setErrorHelper("Something went wrong. Please try again");
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
      });
  };

  return {
    handlePlaylistUpdate,
    handlePlaylistDelete,
    handlePlaylistCreate,
    handleMoveTrack,
  };
};

export default usePlaylistActions;
