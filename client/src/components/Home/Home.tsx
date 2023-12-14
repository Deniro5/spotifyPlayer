import { useMemo } from "react";
import { useAppSelector } from "../../hooks";
import styled from "styled-components";
import { PlaylistSquare } from "./PlaylistSquare";
import { PlaylistSortOptions } from "../../types";
import { getPlaylistSortOption, getPlaylists } from "../../redux/slices/selectors";

const Home = ({}) => {
  const playlists = useAppSelector(getPlaylists);
  const playlistSortOption = useAppSelector(getPlaylistSortOption);

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
