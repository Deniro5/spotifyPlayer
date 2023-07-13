import React from "react";
import SpotifyPlayer, { State } from "react-spotify-web-playback";
import usePlayer from "../hooks/usePlayer";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ReactComponent as ShuffleIcon } from "../assets/shuffle.svg";
import {
  setDeviceId,
  setIsPlaying,
  setPlayingTrack,
  setShuffle,
} from "../redux/slices/playerSlice";
import { getDeviceId, getShuffle } from "../redux/slices/selectors";

interface PlayerProps {
  accessToken: string | null;
}

export const Player = ({ accessToken }: PlayerProps) => {
  const dispatch = useAppDispatch();
  const deviceId = useAppSelector(getDeviceId);
  const shuffle = useAppSelector(getShuffle);
  const { toggleShuffle } = usePlayer();

  if (!accessToken) return null;

  const handlePlayerCallback = (state: State) => {
    if (state.deviceId && state.deviceId !== deviceId) {
      dispatch(setDeviceId(state.deviceId));
    }
    if (state.track) {
      const { name, uri } = state.track;
      //the empty fields here arent needed
      const currentTrack = {
        name,
        albumUrl: "",
        albumName: "",
        uri,
        duration_ms: 0,
        artist: "",
      };
      dispatch(setPlayingTrack(currentTrack));
    }
    dispatch(setIsPlaying(state.isPlaying));
    dispatch(setShuffle(state.shuffle));
  };
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
