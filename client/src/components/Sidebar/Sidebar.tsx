import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserInfo } from "./UserInfo";
import { Menu } from "./Menu";
import { PlaylistsList } from "./PlaylistsList";
import SpotifyWebApi from "spotify-web-api-node";
import { Playlist } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPlaylists } from "../../redux/slices/playerSlice";
import { COLORS } from "../../constants";
import { getAccessToken } from "../../redux/slices/selectors";

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
});

const Sidebar = () => {
  return (
    <Container>
      <UserInfo />
      <Menu />
      <PlaylistsList />
    </Container>
  );
};

const Container = styled.div`
  width: 179px;
  padding: 0 35px;
  height: 100vh;
  background: ${COLORS.secondary};
  position: fixed;
  border-right: 1px whitesmoke solid;
`;

export { Sidebar };
