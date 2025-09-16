import useRecommendations from "../../../hooks/useRecommendations";
import { useAppSelector } from "../../../hooks";
import RecommendationResult from "./RecommendationResult";
import styled from "styled-components";
import { getRecommendedTracks } from "../../../redux/slices/PlayerSlice/selectors";
import { COLORS } from "../../../constants";
import SkeletonLoader from "../../Common/Loaders/SkeletonLoader";
import useTrackContextMenu from "../../../hooks/useTrackContextMenu";

const Recommendations = () => {
  const { contextMenu: TrackContextMenu, handleRightClick } =
    useTrackContextMenu({ hideRemoveSong: true });
  const { isFetching } = useRecommendations();
  const recommendedTracks = useAppSelector(getRecommendedTracks);

  console.log(recommendedTracks);
  return (
    <Container>
      <Title> Recommended Songs </Title>
      {isFetching ? (
        <SkeletonLoader count={6} height={52} />
      ) : recommendedTracks.length ? (
        <>
          {recommendedTracks.map((track) => (
            <RecommendationResult
              key={track.uri}
              track={track}
              handleRightClick={handleRightClick}
            />
          ))}
        </>
      ) : (
        <SubTitle> Start playing a song to see Recommendations</SubTitle>
      )}
      {TrackContextMenu}
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 20px;
  height: 355px;
  max-width: 305px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  padding-bottom: 15px;
  padding-left: 13px;
`;

const SubTitle = styled.p`
  margin-left: 13px;
  color: ${COLORS.lightFont};
  font-size: 13px;
  margin-top: 0px;
`;

export default Recommendations;
