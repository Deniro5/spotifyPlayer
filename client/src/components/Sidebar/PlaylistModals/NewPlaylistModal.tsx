import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { addPlaylist } from "../../../redux/slices/playerSlice";
import { Playlist } from "../../../types";
import { PlaylistModal } from "./PlaylistModal";

export type INewPlaylistModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const NewPlaylistModal: React.FC<INewPlaylistModalProps> = ({
  isOpen,
  handleClose,
}: INewPlaylistModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useAppSelector((state) => state.player.currentUser);
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const dispatch = useAppDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCreatePlaylist = () => {
    if (!name.length || !currentUser?.id) return;
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
        const newPlaylist = { id, tracks, name, description };
        dispatch(addPlaylist(newPlaylist));
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        // FIX we should display the error on the modal
      });
  };

  return (
    <PlaylistModal
      isOpen={isOpen}
      handleClose={handleClose}
      handleConfirm={handleCreatePlaylist}
      name={name}
      description={description}
      title='Create Playlist'
      handleNameChange={handleNameChange}
      handleDescriptionChange={handleDescriptionChange}
    />
  );
};

export { NewPlaylistModal };
