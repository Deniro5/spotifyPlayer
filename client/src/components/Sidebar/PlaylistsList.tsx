import React, { useState } from "react";
import styled from "styled-components";
import { MenuItem } from "./Menu";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  setCurrentView,
  setSelectedPlaylistId,
  setSelectedTracksHash,
} from "../../redux/slices/playerSlice";
import { View } from "../../types";
import { NewPlaylistModal } from "./PlaylistModals/NewPlaylistModal";
import { PlaylistContextMenu } from "../ContextMenus/PlaylistContextMenu";

export type PlaylistsProps = {};

const PlaylistsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const playlists = useAppSelector((state) => state.player.playlists);
  const selectedPlaylistId = useAppSelector((state) => state.player.selectedPlaylistId);
  const [contextMenuId, setContextMenuId] = useState<string | null>(null);
  const [contextMenuX, setContextMenuX] = useState<number | null>(null);
  const [contextMenuY, setContextMenuY] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePlaylistClick = (id: string) => {
    dispatch(setSelectedPlaylistId(id));
    dispatch(setCurrentView(View.PLAYLIST));
    dispatch(setSelectedTracksHash({}));
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    setContextMenuX(Math.min(e.clientX, window.innerWidth));
    setContextMenuY(Math.min(e.clientY, window.innerHeight));
    setContextMenuId(id);
  };

  const handleNewPlaylistClick = () => {
    handleModalOpen();
  };

  return (
    <Container>
      <Title> MY PLAYLISTS </Title>
      <PlaylistList>
        <MenuItem isActive={false} onClick={handleNewPlaylistClick}>
          Create Playlist
        </MenuItem>
        {playlists.map((playlist) => (
          <MenuItem
            onContextMenu={(e) => handleRightClick(e, playlist.id)}
            onClick={() => handlePlaylistClick(playlist.id)}
            isActive={selectedPlaylistId === playlist.id}
            key={playlist.id}
          >
            {playlist.name}
          </MenuItem>
        ))}
      </PlaylistList>
      {isModalOpen && <NewPlaylistModal isOpen handleClose={handleModalClose} />}
      <PlaylistContextMenu
        contextMenuId={contextMenuId}
        setContextMenuId={setContextMenuId}
        contextMenuX={contextMenuX}
        contextMenuY={contextMenuY}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
`;

const Title = styled.div`
  margin: 0;
  font-weight: 800;
  color: black;
  font-size: 14px;
  color: #bebebe;
  margin-bottom: 20px;
`;

const PlaylistList = styled.div`
  height: calc(85vh - 280px);
  overflow-y: scroll;
`;

export { PlaylistsList };
