import React, { useState } from "react";
import SpotifyPlayer, { SpotifyTrack, State } from "react-spotify-web-playback";
import usePlayer from "../../hooks/usePlayer";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ReactComponent as ShuffleIcon } from "../../assets/shuffle.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import {
  popTracksManuallyAddedToQueue,
  setDeviceId,
  setDontPopQueue,
  setIsPlaying,
  setIsActive,
  setPlayingTrack,
  setQueueTracks,
} from "../../redux/slices/playerSlice";
import {
  getDeviceId,
  getDontPopQueue,
  getShuffle,
  getTracksManuallyAddedToQueue,
  getSleepTimer,
  getSleepTimerMinutes,
} from "../../redux/slices/selectors";
import { SleepModal } from "./SleepModal";
import { COLORS } from "../../constants";
import { MinutesToDisplayTime } from "../../utils";

interface PlayerProps {
  accessToken: string | null;
}

export const Player = ({ accessToken }: PlayerProps) => {
  const dispatch = useAppDispatch();
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);
  const deviceId = useAppSelector(getDeviceId);
  const shuffle = useAppSelector(getShuffle);
  const dontPopQueue = useAppSelector(getDontPopQueue);
  const tracksManuallyAddedToQueue = useAppSelector(getTracksManuallyAddedToQueue);
  const sleepTimer = useAppSelector(getSleepTimer);
  const sleepTimerMinutes = useAppSelector(getSleepTimerMinutes);
  const { toggleShuffle } = usePlayer();

  if (!accessToken) return null;

  const handlePlayerCallback = (state: State) => {
    console.log(state);
    if (state.deviceId && state.deviceId !== deviceId) {
      dispatch(setDeviceId(state.deviceId));
    }
    if (state.progressMs === 0 && state.isPlaying) {
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
      handleQueueUpdate(uri);
      dispatch(setPlayingTrack(currentTrack));
      //We need to update the queue here.
      //If we try to update it in the useQueue hook when the playing track changes
      //it will retrieve an outdated queue, we have to update here to get the most recent.
      dispatch(
        setQueueTracks(
          state.nextTracks.map((track: SpotifyTrack) => {
            return {
              name: track.name,
              albumUrl: track.image,
              albumName: "",
              uri: track.uri,
              duration_ms: 0,
              artist: track.artists[0].name,
            };
          })
        )
      );
    }
    dispatch(setIsPlaying(state.isPlaying));
    dispatch(setIsActive(state.isActive));
    //dispatch(setShuffle(state.shuffle));
  };

  const handleQueueUpdate = (newUri: string) => {
    if (dontPopQueue) {
      dispatch(setDontPopQueue(false));
    } else if (
      tracksManuallyAddedToQueue.length &&
      tracksManuallyAddedToQueue[0].uri === newUri
    ) {
      dispatch(popTracksManuallyAddedToQueue());
    }
  };

  const handleToggleSleepModal = () => {
    setIsSleepModalOpen(!isSleepModalOpen);
  };

  return (
    <PlayerContainer>
      <ShuffleIconContainer onClick={toggleShuffle} isActive={shuffle}>
        <ShuffleIcon height={24} width={24} />
      </ShuffleIconContainer>
      <ClockIconContainer onClick={handleToggleSleepModal} isActive={!!sleepTimerMinutes}>
        <ClockIcon height={22} width={22} />
        {!!sleepTimerMinutes && <p> {MinutesToDisplayTime(sleepTimerMinutes)}</p>}
      </ClockIconContainer>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={handlePlayerCallback}
        syncExternalDevice
        uris={[]}
      />
      {isSleepModalOpen && (
        <SleepModal isOpen handleCloseSleepModal={handleToggleSleepModal} />
      )}
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  position: relative;
`;

const ShuffleIconContainer = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 20px;
  left: calc(50% - 110px);
  cursor: pointer;
  path {
    stroke: ${({ isActive }) => (isActive ? "blue" : "lightgrey")};
  }
`;

const ClockIconContainer = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 29px;
  right: 190px;
  cursor: pointer;
  path {
    fill: ${({ isActive }) => isActive && COLORS.primary};
  }
  font-size: 10px;
  p {
    margin-top: 0px;
    color: ${COLORS.primary};
  }
`;
