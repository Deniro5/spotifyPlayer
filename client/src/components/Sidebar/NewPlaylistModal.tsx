import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { addPlaylist } from "../../redux/slices/playerSlice";
import { Playlist } from "../../types";
import Button from "../Common/Button";

export type INewPlaylistModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const customModalStyle = {
  content: {
    width: "350px",
    height: "360px",
    left: "calc(50% - 196px)",
    top: "calc(50% - 250px)",
  },
};

const NewPlaylistModal: React.FC<INewPlaylistModalProps> = ({
  isOpen,
  handleClose,
}: INewPlaylistModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const currentUser = useAppSelector((state) => state.player.currentUser);
  const accessToken = useAppSelector((state) => state.player.accessToken);
  const dispatch = useAppDispatch();

  const clearFields = () => {
    setName("");
    setDescription("");
    setIsPublic(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleIsPublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
  };

  const handleCreatePlaylist = () => {
    if (!name.length || !currentUser?.id) return;
    fetch(`https://api.spotify.com/v1/users/${currentUser.id}/playlists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, description, public: isPublic }),
    })
      .then((res) => res.json())
      .then((data: Playlist) => {
        const { id, tracks, name } = data;
        const newPlaylist = { id, tracks, name };
        dispatch(addPlaylist(newPlaylist));
        clearFields();
        handleClose();
      })
      .catch((err) => {
        console.log(err);

        // we should display the error on the modal
      });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customModalStyle}>
      <Title>Create Playlist</Title>
      <FieldContainer>
        <FieldLabel>Name</FieldLabel>
        <Field value={name} onChange={handleNameChange} />
      </FieldContainer>
      <FieldContainer>
        <FieldLabel>Description</FieldLabel>
        <DescriptionField value={description} onChange={handleDescriptionChange} />
      </FieldContainer>
      <FieldContainer>
        <CheckboxContainer>
          <FieldLabel> Public</FieldLabel>

          <Checkbox type='checkbox' checked={isPublic} onChange={handleIsPublicChange} />
        </CheckboxContainer>
      </FieldContainer>
      <ButtonContainer>
        <Button
          width={120}
          height={40}
          hoverColor='mediumblue'
          onClick={handleCreatePlaylist}>
          Confirm
        </Button>
        <Button width={120} height={40} hoverColor='yellow' onClick={handleClose}>
          Cancel
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

const FieldContainer = styled.div``;

const FieldLabel = styled.p`
  font-weight: 600;
  margin-bottom: 10px;
`;

const Field = styled.input`
  width: 345px;
  height: 23px;
  font-size: 15px;
`;

const DescriptionField = styled.textarea`
  width: 300px;
  outline: blue;
  resize: none;
  height: 70px;
  width: 345px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu";
  font-size: 15px;
`;

const Title = styled.h2`
  margin-top: 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 270px;
  margin: auto;
  margin-top: 25px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2px;
  margin-top: 4px;
`;

const Checkbox = styled.input`
  margin-top: 10px;
  margin-left: 9px;
`;

export { NewPlaylistModal };
