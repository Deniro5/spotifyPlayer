import React, { useState } from "react";
import styled from "styled-components";
import { MenuItem, Title } from "./Menu";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  setCurrentView,
  setSelectedPlaylistId,
  setSelectedTracksHash,
} from "../../redux/slices/playerSlice";
import { View } from "../../types";
import { NewPlaylistModal } from "./PlaylistModals/NewPlaylistModal";
import { PlaylistContextMenu } from "../ContextMenus/PlaylistContextMenu";
import {
  getPlaylists,
  getSelectedPlaylistId,
} from "../../redux/slices/selectors";
import useFetchPlaylists from "../../hooks/useFetchPlaylists";

export type PlaylistsProps = {};

const PlaylistsList = () => {
  const { isFetching } = useFetchPlaylists();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const playlists = useAppSelector(getPlaylists);
  const selectedPlaylistId = useAppSelector(getSelectedPlaylistId);
  const [contextMenuId, setContextMenuId] = useState<string | null>(null);
  const [contextMenuX, setContextMenuX] = useState<number>(0);
  const [contextMenuY, setContextMenuY] = useState<number>(0);
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
      <Title> Playlists </Title>
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
            <MenuItemText> {playlist.name} </MenuItemText>
          </MenuItem>
        ))}
      </PlaylistList>
      {isModalOpen && (
        <NewPlaylistModal isOpen handleClose={handleModalClose} />
      )}
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

const PlaylistList = styled.div`
  height: calc(85vh - 312px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MenuItemText = styled.div`
  max-width: 170px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export { PlaylistsList };
