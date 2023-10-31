import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import styled from "styled-components";
import { getQueueTracks } from "../../../redux/slices/selectors";
import useQueue from "../../../hooks/useQueue";
import QueueResult from "./QueueResult";
import { TrackContextMenu } from "../../ContextMenus/TrackContextMenu";
import { Track } from "../../../types";
import { setSelectedTracksHash } from "../../../redux/slices/playerSlice";
import { COLORS } from "../../../constants";

const Queue = () => {
  const { isFetching } = useQueue();

  const dispatch = useAppDispatch();

  const [contextMenuTrack, setContextMenuTrack] = useState<Track | null>(null);
  const [contextMenuX, setContextMenuX] = useState<number>(0);
  const [contextMenuY, setContextMenuY] = useState<number>(0);
  const queueTracks = useAppSelector(getQueueTracks);

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    track: Track
  ) => {
    e.preventDefault();
    dispatch(setSelectedTracksHash({}));
    setContextMenuX(Math.min(e.clientX, window.innerWidth));
    setContextMenuY(Math.min(e.clientY, window.innerHeight));
    setContextMenuTrack(track);
  };

  return (
    <Container>
      <TitleContainer>
        <Title> Up Next: </Title>
      </TitleContainer>
      {queueTracks.length ? (
        <>
          {queueTracks.slice(0, 2).map((track, index) => (
            <QueueResult
              key={track.uri}
              track={track}
              handleRightClick={handleRightClick}
              index={index}
            />
          ))}

          <TrackContextMenu
            setContextMenuTrack={setContextMenuTrack}
            contextMenuX={contextMenuX}
            contextMenuY={contextMenuY}
            contextMenuTrack={contextMenuTrack}
            hideAddToQueue
            hideRemoveSong
          />
        </>
      ) : (
        <SubTitle> No tracks currently in the queue</SubTitle>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 20px;
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  padding-top: 15px;
  padding-bottom: 2px;
  padding-left: 13px;
`;

const TitleContainer = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 305px;
`;

const SubTitle = styled.p`
  margin-left: 13px;
  color: ${COLORS.mediumGrey};
  font-size: 13px;
  margin-top: -10px;
`;

export { Queue };
