import React, { useCallback, useMemo, useRef } from "react";
import { Popover } from "react-tiny-popover";
import styled from "styled-components";
import { PopoverContentWrapper } from "./PopoverContentWrapper";
import useTrackActions from "../../hooks/useTrackActions";
import { useAppSelector } from "../../hooks";
import Dropdown from "react-multilevel-dropdown";
import {
  getIsActive,
  getLastPlaylistAddedTo,
  getPlaylists,
  getSelectedPlaylistId,
  getSelectedTracksArray,
} from "../../redux/slices/selectors";
import useSpotifyApiActions from "../../hooks/useSpotifyApiActions";
import { Track } from "../../types";

export type ITrackContextMenuProps = {
  contextMenuTrack: Track | null;
  setContextMenuTrack: React.Dispatch<React.SetStateAction<Track | null>>;
  contextMenuX: number;
  contextMenuY: number;
  hideAddToQueue?: boolean;
  hideRemoveSong?: boolean;
};

const TrackContextMenu: React.FC<ITrackContextMenuProps> = ({
  contextMenuTrack,
  setContextMenuTrack,
  contextMenuX,
  contextMenuY,
  hideAddToQueue,
  hideRemoveSong,
}) => {
  const playlists = useAppSelector(getPlaylists);
  const isActive = useAppSelector(getIsActive);
  const selectedPlaylistId = useAppSelector(getSelectedPlaylistId);
  const lastPlaylistAddedTo = useAppSelector(getLastPlaylistAddedTo);
  const selectedTracksArray = useAppSelector(getSelectedTracksArray);
  const { addToQueue } = useSpotifyApiActions();

  const { addTracks, removeTracks } = useTrackActions(
    Array.from(new Set([contextMenuTrack?.uri || null, ...selectedTracksArray]))
  );

  const getStyles = useCallback(() => {
    //TODO: Clean this up. At least use constants rather than 'magic numbers'
    const popoverWidth = 225;
    const popoverHeight = 107;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let adjustedX = contextMenuX;
    let adjustedY = contextMenuY;

    if (adjustedX + popoverWidth > screenWidth) {
      adjustedX = screenWidth - popoverWidth;
    }

    if (adjustedY + popoverHeight > screenHeight) {
      adjustedY = screenHeight - popoverHeight;
    }
    const submenuWidth = 180;
    //36 is the height of a menu item
    const submenuHeight = Math.min(playlists.length * 36, 259);
    let submenuLeft = 225;
    let submenuTop = 0;
    if (adjustedX + popoverWidth > screenWidth - submenuWidth) {
      submenuLeft = -211;
    }
    if (adjustedY + popoverHeight > screenHeight - submenuHeight) {
      submenuTop = -Math.min(playlists.length * 36, 223);
    }

    return {
      mainStyle: { top: `${adjustedY}px`, left: `${adjustedX}px`, zIndex: "10" },
      submenuTop,
      submenuLeft,
    };
  }, [contextMenuX, contextMenuY]);

  const handleAddToQueue = () => {
    addToQueue(contextMenuTrack);
    setContextMenuTrack(null);
  };

  const handleAddClick = (playlistId: string) => {
    addTracks(playlistId);
    setContextMenuTrack(null);
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
    setContextMenuTrack(null);
  };

  const { mainStyle, submenuTop, submenuLeft } = getStyles();

  const content = (
    <PopoverContentWrapper width={225}>
      <div>
        {!hideAddToQueue && (
          <Dropdown.Item onClick={handleAddToQueue}>
            <DisableWrapper isDisabled={!isActive}>Add to Queue</DisableWrapper>
          </Dropdown.Item>
        )}
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
          <StyledDropdownSubmenu
            adjustedTop={submenuTop}
            adjustedLeft={submenuLeft}
            position='right'
          >
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
          </StyledDropdownSubmenu>
        </Dropdown.Item>
        {selectedPlaylistId && !hideRemoveSong && (
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
        onClickOutside={() => setContextMenuTrack(null)}
        isOpen={!!contextMenuTrack}
        content={content}
        containerStyle={mainStyle}
      >
        <></>
      </Popover>
    </>
  );
};

const StyledDropdownSubmenu = styled(Dropdown.Submenu)<{
  adjustedTop: number;
  adjustedLeft: number;
}>`
  top: ${({ adjustedTop }) => adjustedTop}px;
  left: ${({ adjustedLeft }) => adjustedLeft}px;
`;

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
