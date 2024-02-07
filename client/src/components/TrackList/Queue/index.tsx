import { useAppSelector } from "../../../hooks";
import styled from "styled-components";
import { getQueueTracks } from "../../../redux/slices/PlayerSlice/selectors";
import QueueResult from "./QueueResult";
import { COLORS } from "../../../constants";
import useTrackContextMenu from "../../../hooks/useTrackContextMenu";

const Queue = () => {
  const { contextMenu: TrackContextMenu, handleRightClick } =
    useTrackContextMenu({ hideRemoveSong: true, hideAddToQueue: true });
  const queueTracks = useAppSelector(getQueueTracks);

  return (
    <Container>
      <TitleContainer>
        <Title> Up Next </Title>
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
          {TrackContextMenu}
        </>
      ) : (
        <SubTitle> No tracks currently in the queue</SubTitle>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 20px;
  max-width: 305px;
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

export default Queue;
