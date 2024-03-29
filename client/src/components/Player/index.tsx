import { useState } from "react";
import SpotifyPlayer, {
  SpotifyTrack,
  State,
  Type,
} from "react-spotify-web-playback";
import usePlayer from "../../hooks/usePlayer";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ShuffleIcon from "../../assets/shuffle.svg?react";
import ClockIcon from "../../assets/clock.svg?react";
import {
  popTracksManuallyAddedToQueue,
  setDeviceId,
  setDontPopQueue,
  setIsPlaying,
  setIsActive,
  setPlayingTrack,
  setQueueTracks,
} from "../../redux/slices/PlayerSlice/playerSlice";
import {
  getDeviceId,
  getDontPopQueue,
  getShuffle,
  getTracksManuallyAddedToQueue,
  getSleepTimerMinutes,
  getPlayingTrack,
  getIsPlaying,
} from "../../redux/selectors";
import SleepModal from "./SleepModal";
import { COLORS } from "../../constants";
import { MinutesToDisplayTime } from "../../utils";
import { addSongsStatusHash } from "../../redux/slices/TrackSlice/trackSlice";
import useTrackContextMenu from "../../hooks/useTrackContextMenu";

interface PlayerProps {
  accessToken: string | null;
}

interface StateWithType extends State {
  type: Type;
}

const Player = ({ accessToken }: PlayerProps) => {
  const dispatch = useAppDispatch();
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const deviceId = useAppSelector(getDeviceId);
  const shuffle = useAppSelector(getShuffle);
  const dontPopQueue = useAppSelector(getDontPopQueue);
  const tracksManuallyAddedToQueue = useAppSelector(
    getTracksManuallyAddedToQueue
  );
  const sleepTimerMinutes = useAppSelector(getSleepTimerMinutes);
  const { contextMenu: TrackContextMenu, handleRightClick } =
    useTrackContextMenu({
      hideRemoveSong: true,
      hideAddToQueue: true,
    });
  const playingTrack = useAppSelector(getPlayingTrack);

  const { toggleShuffle } = usePlayer();

  if (!accessToken) return null;

  const handlePlayerCallback = (state: StateWithType) => {
    if (!isLoaded && state.deviceId) setIsLoaded(true);
    if (state.deviceId && state.deviceId !== deviceId) {
      dispatch(setDeviceId(state.deviceId));
    }
    if (state.type === "favorite_update" && state.progressMs >= 300) {
      //update the songsStatusHash if updated in the player
      //We need the condition because a favorite update is fired onPlay and we cant tell it apart from other favorite updates so we check the progress. Progress sometimes is non zero so we are using 350ms as a boundary
      dispatch(addSongsStatusHash({ [state.track.id]: state.isSaved }));
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

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playingTrack || !isLoaded) return;

    handleRightClick(e, playingTrack);
  };

  const shuffleButton = (
    <ShuffleIconContainer onClick={toggleShuffle} isActive={shuffle}>
      <ShuffleIcon height={24} width={24} />
    </ShuffleIconContainer>
  );

  return (
    <PlayerContainer>
      {isLoaded && <></>}
      <ClockIconContainer
        onClick={handleToggleSleepModal}
        isActive={!!sleepTimerMinutes}
      >
        <ClockIcon height={22} width={22} />
        {!!sleepTimerMinutes && (
          <p> {MinutesToDisplayTime(sleepTimerMinutes)}</p>
        )}
      </ClockIconContainer>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={handlePlayerCallback}
        syncExternalDevice
        uris={[]}
        styles={{
          activeColor: COLORS.primary,
          loaderSize: "20px",
        }}
        components={{ leftButton: shuffleButton }}
      />
      {isSleepModalOpen && (
        <SleepModal isOpen handleCloseSleepModal={handleToggleSleepModal} />
      )}
      <TrackClickArea onContextMenu={handleContextMenu}></TrackClickArea>
      {TrackContextMenu}
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  position: relative;
  border-top: 1px solid ${COLORS.lightSecondary};
`;

const ShuffleIconContainer = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  path {
    stroke: ${({ isActive }) => (isActive ? COLORS.primary : "lightgrey")};
  }
  z-index: 10;
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
  z-index: 10;

  @media (max-width: 767px) {
    top: 20px;
    right: 50px;
  }
`;

const TrackClickArea = styled.div`
  position: absolute;
  top: 0px;
  left: 80px;
  width: 150px;
  height: 40px;
`;

export default Player;
