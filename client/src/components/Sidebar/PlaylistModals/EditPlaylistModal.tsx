import React from "react";
import { useAppSelector } from "../../../hooks";
import PlaylistModal from "./PlaylistModal";
import { getPlaylistById } from "../../../redux/selectors";
import usePlaylistActions from "../../../hooks/usePlaylistActions";

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

  const handleUpdatePlaylist = (name: string, description: string) => {
    if (!playlist) return;
    handlePlaylistUpdate(playlist, name, description);
    handleClose();
  };

  return (
    <PlaylistModal
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={handleUpdatePlaylist}
      title="Edit Playlist"
      initialName={playlist?.name}
      initialDescription={playlist?.description}
    />
  );
};

export default EditPlaylistModal;
