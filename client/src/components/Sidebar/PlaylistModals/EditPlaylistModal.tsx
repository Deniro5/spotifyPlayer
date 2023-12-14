import React, { useState } from "react";
import { useAppSelector } from "../../../hooks";
import { PlaylistModal } from "./PlaylistModal";
import { getPlaylistById } from "../../../redux/slices/selectors";
import usePlaylistActions from "../../../hooks/usePlaylistActions";
import { isAlphaNumeric } from "../../../utils";

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
  const { handlePlaylistUpdate } = usePlaylistActions(null);

  const playlist = useAppSelector(getPlaylistById(playlistId));

  const [name, setName] = useState(playlist?.name || "");
  const [description, setDescription] = useState(playlist?.description || "");
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const isValid = () => {
    if (!name.length) {
      setError("Name field cannot be blank");
      return false;
    } else if (!isAlphaNumeric(name) || !isAlphaNumeric(description)) {
      setError("Invalid characters in name/description field");
      return false;
    }
    setError(null);
    return true;
  };

  const handleUpdatePlaylist = () => {
    if (!playlist || !isValid()) return;
    handlePlaylistUpdate(playlist, name, description);
    handleClose();
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
      error={error}
    />
  );
};

export { EditPlaylistModal };
