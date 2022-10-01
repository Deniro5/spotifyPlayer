import React from "react";
import { Popover } from "react-tiny-popover";
import styled from "styled-components";
import { PopoverContentWrapper } from "./PopoverContentWrapper";
import useTrackActions from "../../hooks/useTrackActions";

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

  const { removeTrack } = useTrackActions(contextMenuId);
  const getContainerStyle = () => {
    return {
      top: `${contextMenuY}px`,
      left: `${contextMenuX}px`,
    };
  };

  const handleRemoveClick = () => {
    removeTrack();
    setContextMenuId(null);
  };

  const content = (
    <PopoverContentWrapper>
      <MenuItem onClick={handleRemoveClick}> Remove From Playlist </MenuItem>
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

const MenuItem = styled.div`
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: whitesmoke;
  }
`;

export { TrackContextMenu };
