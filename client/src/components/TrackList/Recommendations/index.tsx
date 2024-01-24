import React, { useState } from "react";
import useRecommendations from "../../../hooks/useRecommendations";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import RecommendationResult from "./RecommendationResult";
import styled from "styled-components";
import { getRecommendedTracks } from "../../../redux/slices/PlayerSlice/selectors";
import { COLORS } from "../../../constants";
import { Track } from "../../../types";
import TrackContextMenu from "../../ContextMenus/TrackContextMenu";
import SkeletonLoader from "../../Common/Loaders/SkeletonLoader";
import { setSelectedTracksHash } from "../../../redux/slices/TrackSlice/trackSlice";

const Recommendations = () => {
  const { isFetching } = useRecommendations();
  const dispatch = useAppDispatch();

  const [contextMenuTrack, setContextMenuTrack] = useState<Track | null>(null);
  const [contextMenuX, setContextMenuX] = useState<number>(0);
  const [contextMenuY, setContextMenuY] = useState<number>(0);
  const recommendedTracks = useAppSelector(getRecommendedTracks);

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
      <TrackContextMenu
        setContextMenuTrack={setContextMenuTrack}
        contextMenuX={contextMenuX}
        contextMenuY={contextMenuY}
        contextMenuTrack={contextMenuTrack}
        hideRemoveSong
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 20px;
  height: 355px;
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
