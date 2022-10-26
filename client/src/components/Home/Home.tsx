import React from "react";
import { useAppSelector } from "../../hooks";
import styled from "styled-components";
import { PlaylistSquare } from "./PlaylistSquare";

const Home = ({}) => {
  const playlists = useAppSelector((state) => state.player.playlists);

  return (
    <Container>
      {playlists.map((playlist) => (
        <PlaylistSquare playlist={playlist} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export { Home };
