import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { updatePlaylist } from "../../../redux/slices/playerSlice";
import { PlaylistModal } from "./PlaylistModal";

export type IEditPlaylistModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  playlistId: string | null;
};

const EditPlaylistModal: React.FC<IEditPlaylistModalProps> = ({
  isOpen,
  handleClose,
  playlistId,
}: IEditPlaylistModalProps) => {
  const playlist = useAppSelector((state) =>
    state.player.playlists.find((playlist) => playlist.id === playlistId)
  );
  const [name, setName] = useState(playlist?.name || "");
  const [description, setDescription] = useState(playlist?.description || "");
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const dispatch = useAppDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleUpdatePlaylist = () => {
    if (!name.length || !playlist) return;
    fetch(`https://api.spotify.com/v1/playlists/${playlist.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, description }),
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
        handleClose();
      })
      .catch((err) => {
        //FIX put this error on the modal and dont close!
        console.log(err);
      });
  };

  return (
    <PlaylistModal
      isOpen={isOpen}
      handleClose={handleClose}
      handleConfirm={handleUpdatePlaylist}
      title='Edit Playlist'
      name={name}
      description={description}
      handleNameChange={handleNameChange}
      handleDescriptionChange={handleDescriptionChange}
    />
  );
};

export { EditPlaylistModal };
