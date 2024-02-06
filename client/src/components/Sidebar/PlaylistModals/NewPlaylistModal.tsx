import React from "react";
import PlaylistModal from "./PlaylistModal";
import usePlaylistActions from "../../../hooks/usePlaylistActions";

export type INewPlaylistModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const NewPlaylistModal: React.FC<INewPlaylistModalProps> = ({
  isOpen,
  handleClose,
}: INewPlaylistModalProps) => {
  const { handlePlaylistCreate } = usePlaylistActions(null);

  const handleCreate = (name: string, description: string) => {
    handlePlaylistCreate(name, description);
    handleClose();
  };

  return (
    <PlaylistModal
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={handleCreate}
      title="Create Playlist"
    />
  );
};

export default NewPlaylistModal;
