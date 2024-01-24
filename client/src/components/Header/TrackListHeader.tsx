import styled from "styled-components";
import { COLORS } from "../../constants";

export interface TrackListHeaderProps {
  imgSrc: string;
  name: string;
  trackCount: string;
}

const TrackListHeader = ({
  imgSrc,
  name,
  trackCount,
}: TrackListHeaderProps) => {
  return (
    <Container>
      <PlaylistImage height={70} width={70} src={imgSrc} />
      <PlaylistInfo>
        <PlaylistName> {name} </PlaylistName>
        <PlaylistTrackCount>{trackCount} Tracks</PlaylistTrackCount>
      </PlaylistInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
`;

const PlaylistImage = styled.img`
  padding-left: 2px;
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

const PlaylistName = styled.p`
  font-size: 18px;
  max-width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
  color: ${COLORS.black};
  margin: 0;
  margin-top: 5px;
`;

const PlaylistTrackCount = styled.p`
  font-size: 14px;
  max-width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${COLORS.lightFont};
  padding-top: 2px;
  margin: 0;
`;

export default TrackListHeader;
