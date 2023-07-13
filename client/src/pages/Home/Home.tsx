import React from "react";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Player } from "../../components/Player";
import SpotifyWebApi from "spotify-web-api-node";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Router from "../../components/Router";
import { setAccessToken } from "../../redux/slices/playerSlice";
import { Track } from "../../types";
import { getSearch } from "../../redux/slices/selectors";

interface HomeProps {
  code: string;
}

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
});

export const Home = ({ code }: HomeProps) => {
  const accessToken = useAuth(code);
  const search = useAppSelector(getSearch);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
    dispatch(setAccessToken(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      if (res.body.tracks?.items) {
        setSearchResults(
          res?.body?.tracks?.items?.map((track) => {
            const { album, name, uri, duration_ms, artists } = track;
            const smallestAlbumImage = album.images.reduce((smallest, image) => {
              if (smallest.height && image.height) {
                if (image?.height < smallest?.height) return image;
                return smallest;
              }
              return smallest;
            }, album.images[0]);

            return {
              artist: artists[0].name,
              name,
              uri,
              albumUrl: smallestAlbumImage.url,
              albumName: "",
              duration_ms,
            };
          })
        );
      }
    });
  }, [search, accessToken]);

  return (
    <Container>
      <Sidebar />
      <Main>
        <Header />
        <Body>
          <ViewContainer>
            <Router />
          </ViewContainer>
        </Body>
        <PlayerContainer>
          <Player accessToken={accessToken} />
        </PlayerContainer>
      </Main>
    </Container>
  );
};

const Main = styled.div`
  padding-left: 250px;
  overflow: hidden;
`;

//i35px is the height of the header + div
const Body = styled.div`
  display: flex;
  height: calc(100vh - 143px);
  overflow-x: hidden;
`;

const ViewContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
`;

const Container = styled.div``;

const PlayerContainer = styled.div`
  width: 100%;
`;
