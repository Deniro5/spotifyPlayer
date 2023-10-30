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
import { ToastType, Track } from "../../types";
import { getSearch } from "../../redux/slices/selectors";
import Toast from "../../components/Toast";
import { setToast } from "../../redux/slices/playerSlice";
interface HomeProps {
  code: string;
}

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
});

export const Home = ({ code }: HomeProps) => {
  const accessToken = useAuth(code);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
    dispatch(setAccessToken(accessToken));
  }, [dispatch, accessToken]);

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
      <Toast />
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
  overflow-x: hidden;
  max-height: calc(100vh - 170px);
`;

const ViewContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Container = styled.div``;

const PlayerContainer = styled.div`
  width: 100%;
`;
