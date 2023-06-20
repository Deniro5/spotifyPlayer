import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import usePlayer from "../hooks/usePlayer";
import styled from "styled-components";
import { useAppSelector } from "../hooks";
import { ReactComponent as ShuffleIcon } from "../assets/shuffle.svg";

interface PlayerProps {
  accessToken: any;
  trackUri: any;
}

export const Player = ({ accessToken, trackUri }: PlayerProps) => {
  const [play, setPlay] = useState(false);
  const shuffle = useAppSelector((state) => state.player.shuffle);
  const { toggleShuffle } = usePlayer();

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <PlayerContainer>
      <ShuffleIconContainer onClick={toggleShuffle} isActive={shuffle}>
        {" "}
        <ShuffleIcon height={24} width={24} />{" "}
      </ShuffleIconContainer>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        offset={undefined}
        callback={(state: any) => {
          if (!state.isPlaying) setPlay(false);
        }}
        syncExternalDevice
        play={play}
        uris={trackUri ? [trackUri] : []}
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
