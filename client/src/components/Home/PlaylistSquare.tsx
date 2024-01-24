import React from "react";
import { Playlist, View } from "../../types";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useAppDispatch } from "../../hooks";
import QuestionImg from "../../assets/question.png";
import { setSelectedPlaylistId } from "../../redux/slices/PlaylistSlice/playlistSlice";
import { setCurrentView } from "../../redux/slices/AppSlice/appSlice";
export type IPlaylistSquareProps = {
  playlist: Playlist;
};

const PlaylistSquare: React.FC<IPlaylistSquareProps> = ({ playlist }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setSelectedPlaylistId(playlist.id));
    dispatch(setCurrentView(View.PLAYLIST));
  };

  return (
    <Container onClick={handleClick}>
      <PlaylistImage
        src={playlist.images[1]?.url || QuestionImg}
        alt={"Unknown"}
      />
      <PlaylistName> {playlist.name} </PlaylistName>
    </Container>
  );
};

const PlaylistImage = styled.img`
  transition: 0.3s;
  max-width: 300px;
`;

const PlaylistName = styled.p`
  font-weight: 500;
  font-size: 18px;
  transition: 0.3s;
  margin-top: 10px;
`;

const Container = styled.div`
  flex: 1;
  width: 30%;
  margin: 25px 40px;
  cursor: pointer;
  text-align: center;
  &:hover {
    ${PlaylistImage} {
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }
    color: ${COLORS.darkPrimary};
  }
`;

export default PlaylistSquare;
