import React, { useState } from "react";
import PlaylistModal from "./PlaylistModal";
import usePlaylistActions from "../../../hooks/usePlaylistActions";
import { isAlphaNumeric } from "../../../utils";

export type INewPlaylistModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const NewPlaylistModal: React.FC<INewPlaylistModalProps> = ({
  isOpen,
  handleClose,
}: INewPlaylistModalProps) => {
  const { handlePlaylistCreate } = usePlaylistActions(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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

  const handleCreate = () => {
    if (!isValid()) return;
    handlePlaylistCreate(name, description);
    handleClose();
  };

  return (
    <PlaylistModal
      isOpen={isOpen}
      handleClose={handleClose}
      handleConfirm={handleCreate}
      name={name}
      description={description}
      title="Create Playlist"
      handleNameChange={handleNameChange}
      handleDescriptionChange={handleDescriptionChange}
      error={error}
    />
  );
};

export default NewPlaylistModal;
