import React from "react";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Player } from "../../components/Player";
import { TrackSearchResult } from "../../components/TrackList/TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-node";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Router from "../../components/Router";
import { setAccessToken } from "../../redux/slices/playerSlice";
import { Track } from "../../types";

interface HomeProps {
  code: string;
}

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
});

export const Home = ({ code }: HomeProps) => {
  const accessToken = useAuth(code);
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const search = useAppSelector((state) => state.player.search);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    dispatch(setAccessToken(accessToken));
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      if (res.body.tracks?.items) {
        setSearchResults(
          res?.body?.tracks?.items?.map((track) => {
            const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
              if (smallest.height && image.height) {
                if (image?.height < smallest?.height) return image;
                return smallest;
              }
              return smallest;
            }, track.album.images[0]);

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
              duration: track.duration_ms,
            };
          })
        );
      }
    });
  }, [search, accessToken]);

  {
    /* {searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))} */
  }

  return (
    <Container>
      <Sidebar />
      <Main>
        <Header />
        <Body>
          {/* This is where the router needs to go */}
          <ViewContainer>
            <Router />
          </ViewContainer>
          <OtherContainer></OtherContainer>
        </Body>
        <PlayerContainer>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
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
  flex: 2;
  overflow-y: scroll;
`;

const OtherContainer = styled.div`
  flex: 1;
  max-width: 350px;
`;

const Container = styled.div``;

const AlbumImg = styled.img`
  width: 100%;
  max-height: ;
`;

const PlayerContainer = styled.div`
  width: 100%;
`;
