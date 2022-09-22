import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

interface PlayerProps {
  accessToken: any;
  trackUri: any;
}

export const Player = ({ accessToken, trackUri }: PlayerProps) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state: any) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
};
