import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import usePlayer from "../hooks/usePlayer";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ReactComponent as ShuffleIcon } from "../assets/shuffle.svg";
import { setDeviceId, setIsPlaying, setPlayingTrack } from "../redux/slices/playerSlice";
import { current } from "@reduxjs/toolkit";

interface PlayerProps {
  accessToken: any;
}

export const Player = ({ accessToken }: PlayerProps) => {
  const dispatch = useAppDispatch();
  const deviceId = useAppSelector((state) => state.player.deviceId);
  const shuffle = useAppSelector((state) => state.player.shuffle);
  const { toggleShuffle } = usePlayer();

  if (!accessToken) return null;

  const handlePlayerCallback = (state: any) => {
    if (state.deviceId && state.deviceId !== deviceId) {
      dispatch(setDeviceId(state.deviceId));
    }
    if (state.track) {
      const { name, uri, artists, duration } = state.track;
      const currentTrack = {
        title: name,
        albumUrl: "",
        albumName: "",
        uri,
        duration,
        artist: artists[0],
      };
      dispatch(setPlayingTrack(currentTrack));
    }
    dispatch(setIsPlaying(state.isPlaying));
  };
  //When we change offset, the Spotify player doesnt change... we need to find a way to make in manually change
  return (
    <PlayerContainer>
      <ShuffleIconContainer onClick={toggleShuffle} isActive={shuffle}>
        <ShuffleIcon height={24} width={24} />
      </ShuffleIconContainer>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={handlePlayerCallback}
        syncExternalDevice
        uris={[]}
      />
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  position: relative;
`;

const ShuffleIconContainer = styled.div<{ isActive: boolean }>`
  position: absolute;
  z-index: 1000000000000;
  top: calc(50% - 9px);
  left: calc(50% - 110px);
  cursor: pointer;
  path {
    stroke: ${({ isActive }) => (isActive ? "blue" : "lightgrey")};
  }
`;
