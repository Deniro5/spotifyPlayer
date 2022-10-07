import React from "react";
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

  const handleRemoveClick = () => {
    removeTracks();
    setContextMenuId(null);
  };

  const content = (
    <PopoverContentWrapper>
      <div>
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
        <Dropdown.Item onClick={handleRemoveClick}>
          {" "}
          Remove {!!selectedTracksArray.length && "Songs"} From Playlist
        </Dropdown.Item>
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

export { TrackContextMenu };
