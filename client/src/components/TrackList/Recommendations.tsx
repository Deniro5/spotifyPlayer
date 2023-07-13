import React from "react";
import useRecommendations from "../../hooks/useRecommendations";
import { useAppSelector } from "../../hooks";
import { RecommendationResult } from "./RecommendationResult";
import styled from "styled-components";
import { getRecommendedTracks } from "../../redux/slices/selectors";
import { COLORS } from "../../constants";

const Recommendations = () => {
  const { isFetching } = useRecommendations();
  const recommendedTracks = useAppSelector(getRecommendedTracks);
  return (
    <Container>
      <Title> Recommended Songs: </Title>
      {recommendedTracks.length ? (
        <>
          {recommendedTracks.map((track) => (
            <RecommendationResult track={track} handleRightClick={() => {}} />
          ))}
        </>
      ) : (
        <SubTitle> Start playing a song to see Recommendations</SubTitle>
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
  padding-bottom: 15px;
  padding-left: 13px;
`;

const SubTitle = styled.p`
  margin-left: 13px;
  color: ${COLORS.mediumGrey};
  font-size: 13px;
  margin-top: 0px;
`;

export { Recommendations };
