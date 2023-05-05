import React, { useMemo } from "react";
import { useAppSelector } from "../../hooks";
import styled from "styled-components";
import { PlaylistSquare } from "./PlaylistSquare";
import { PlaylistSortOptions } from "../../types";

const Home = ({}) => {
  const playlists = useAppSelector((state) => state.player.playlists);
  const playlistSortOption = useAppSelector((state) => state.player.playlistSortOption);

  const sortedPlaylists = useMemo(() => {
    if (playlistSortOption === PlaylistSortOptions.MOST_RECENT) return playlists;

    const sorted = [...playlists].sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    return sorted;
  }, [playlists, playlistSortOption]);

  return (
    <Container>
      {sortedPlaylists.map((playlist) => (
        <PlaylistSquare playlist={playlist} key={playlist.id} />
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
