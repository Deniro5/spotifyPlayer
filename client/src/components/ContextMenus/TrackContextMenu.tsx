import React, { useMemo } from "react";
import { Popover } from "react-tiny-popover";
import styled from "styled-components";
import { PopoverContentWrapper } from "./PopoverContentWrapper";
import useTrackActions from "../../hooks/useTrackActions";
import { useAppSelector } from "../../hooks";
import Dropdown from "react-multilevel-dropdown";

export type ITrackContextMenuProps = {
  contextMenuId: string | null;
  setContextMenuId: React.Dispatch<React.SetStateAction<string | null>>;
  contextMenuX: number | null;
  contextMenuY: number | null;
};

const TrackContextMenu: React.FC<ITrackContextMenuProps> = ({
  contextMenuId,
  setContextMenuId,
  contextMenuX,
  contextMenuY,
}) => {
  //contentPosition is not working so use this for now instead
  const playlists = useAppSelector((state) => state.player.playlists);
  const selectedPlaylistId = useAppSelector((state) => state.player.selectedPlaylistId);
  const lastPlaylistAddedTo = useAppSelector((state) => state.player.lastPlaylistAddedTo);
  const selectedTracksArray = useAppSelector((state) =>
    Object.keys(state.player.selectedTracksHash)
  );
  const { addTracks, removeTracks } = useTrackActions(
    Array.from(new Set([contextMenuId, ...selectedTracksArray]))
  );
  const getContainerStyle = () => {
    return {
      top: `${contextMenuY}px`,
      left: `${contextMenuX}px`,
    };
  };

  const handleAddClick = (playlistId: string) => {
    addTracks(playlistId);
    setContextMenuId(null);
  };

  const addToLastPlaylistEnabled = useMemo(() => {
    return !!lastPlaylistAddedTo && lastPlaylistAddedTo.id !== selectedPlaylistId;
  }, [lastPlaylistAddedTo]);

  const handleAddToLastPlaylist = () => {
    if (!lastPlaylistAddedTo) return;
    handleAddClick(lastPlaylistAddedTo.id);
  };

  const handleRemoveClick = () => {
    removeTracks();
    setContextMenuId(null);
  };

  const content = (
    <PopoverContentWrapper width={225}>
      <div>
        <Dropdown.Item
          isDisabled={!addToLastPlaylistEnabled}
          onClick={handleAddToLastPlaylist}
        >
          <DisableWrapper isDisabled={!addToLastPlaylistEnabled}>
            Add To Recent:
            {addToLastPlaylistEnabled && ` ${lastPlaylistAddedTo?.name}`}
          </DisableWrapper>
        </Dropdown.Item>
        <Dropdown.Item>
          Add {!!selectedTracksArray.length && "Songs"} To Playlist
          <Dropdown.Submenu position='right'>
            <PlaylistSubListContainer>
              {playlists.map(
                (playlist) =>
                  selectedPlaylistId !== playlist.id && (
                    <Dropdown.Item onClick={() => handleAddClick(playlist.id)}>
                      {playlist.name}
                    </Dropdown.Item>
                  )
              )}
            </PlaylistSubListContainer>
          </Dropdown.Submenu>
        </Dropdown.Item>
        {selectedPlaylistId && (
          <Dropdown.Item onClick={handleRemoveClick}>
            Remove {!!selectedTracksArray.length && "Songs"} From Playlist
          </Dropdown.Item>
        )}
      </div>
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
    </>
  );
};

const PlaylistSubListContainer = styled.div`
  height: 235px;
  overflow-y: scroll;
`;

const DisableWrapper = styled.div<{ isDisabled: boolean }>`
  color: ${({ isDisabled }) => isDisabled && "grey"};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { TrackContextMenu };
