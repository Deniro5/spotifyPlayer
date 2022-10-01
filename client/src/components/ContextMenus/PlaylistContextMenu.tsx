import React, { useState, useEffect } from "react";
import { Popover } from "react-tiny-popover";
import styled from "styled-components";
import usePlaylistActions from "../../hooks/usePlaylistActions";
import { PopoverContentWrapper } from "./PopoverContentWrapper";
import { EditPlaylistModal } from "../Sidebar/PlaylistModals/EditPlaylistModal";

export type IPlaylistContextMenuProps = {
  contextMenuId: string | null;
  setContextMenuId: React.Dispatch<React.SetStateAction<string | null>>;
  contextMenuX: number | null;
  contextMenuY: number | null;
};

const PlaylistContextMenu: React.FC<IPlaylistContextMenuProps> = ({
  contextMenuId,
  setContextMenuId,
  contextMenuX,
  contextMenuY,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPlaylistId, setEditPlaylistId] = useState<string | null>(null);

  const { handlePlaylistDelete, handleRenamePlaylist } =
    usePlaylistActions(contextMenuId);
  //contentPosition is not working so use this for now instead
  const getContainerStyle = () => {
    return {
      top: `${contextMenuY}px`,
      left: `${contextMenuX}px`,
    };
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setEditPlaylistId(contextMenuId);
    setContextMenuId(null);
  };

  const handleDeleteClick = () => {
    handlePlaylistDelete();
    setContextMenuId(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const content = (
    <PopoverContentWrapper>
      <MenuItem onClick={handleEditClick}> Edit Playlist Details </MenuItem>
      <MenuItem onClick={handleDeleteClick}> Delete Playlist </MenuItem>
    </PopoverContentWrapper>
  );

  return (
    <>
      <Popover
        onClickOutside={() => setContextMenuId(null)}
        isOpen={!!contextMenuId}
        content={content}
        containerStyle={getContainerStyle()}
      >
        <></>
      </Popover>
      {isEditModalOpen && (
        <EditPlaylistModal
          isOpen
          handleClose={handleCloseEditModal}
          playlistId={editPlaylistId}
        />
      )}
    </>
  );
};

const MenuItem = styled.div`
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: whitesmoke;
  }
`;

export { PlaylistContextMenu };
