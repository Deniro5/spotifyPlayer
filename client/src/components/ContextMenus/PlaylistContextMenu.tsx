import React from "react";
import { Popover } from "react-tiny-popover";
import styled from "styled-components";
import usePlaylistActions from "../../hooks/usePlaylistActions";
import { PopoverContentWrapper } from "./PopoverContentWrapper";

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
    alert("renamed playlist");
    setContextMenuId(null);
  };

  const handleDeleteClick = () => {
    handlePlaylistDelete();
    setContextMenuId(null);
  };

  const content = (
    <PopoverContentWrapper>
      <MenuItem onClick={handleEditClick}> Edit Playlist Details </MenuItem>
      <MenuItem onClick={handleDeleteClick}> Delete Playlist </MenuItem>
    </PopoverContentWrapper>
  );

  return (
    <Popover
      onClickOutside={() => setContextMenuId(null)}
      isOpen={!!contextMenuId}
      content={content}
      containerStyle={getContainerStyle()}
    >
      <></>
    </Popover>
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
