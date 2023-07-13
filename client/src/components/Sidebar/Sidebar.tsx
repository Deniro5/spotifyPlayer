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
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);

  useEffect(() => {
    if (!accessToken) return;
    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          dispatch(
            setPlaylists(
              data.items.map((playlist: Playlist) => {
                return {
                  id: playlist.id,
                  name: playlist.name,
                  tracks: playlist.tracks,
                  description: playlist.description,
                  images: playlist.images,
                };
              })
            )
          );
        }
      })
      .catch((err) => console.log(err));
  }, [accessToken]);

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
  background: ${COLORS.white};
  position: fixed;
  border-right: 1px whitesmoke solid;
`;

export { Sidebar };
