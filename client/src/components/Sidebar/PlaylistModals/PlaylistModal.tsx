import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { COLORS } from "../../../constants";
import Button from "../../Common/Button";

export type IPlaylistModalProps = {
  isOpen: boolean;
  name: string;
  description: string;
  title: string;
  handleClose: () => void;
  handleConfirm: () => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const customModalStyle = {
  content: {
    width: "350px",
    height: "360px",
    left: "calc(50% - 196px)",
    top: "calc(50% - 250px)",
  },
};

const PlaylistModal: React.FC<IPlaylistModalProps> = ({
  isOpen,
  name,
  description,
  title,
  handleClose,
  handleConfirm,
  handleNameChange,
  handleDescriptionChange,
}: IPlaylistModalProps) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customModalStyle}>
      <Title>{title}</Title>
      <FieldContainer>
        <FieldLabel>Name</FieldLabel>
        <NameField value={name} onChange={handleNameChange} />
      </FieldContainer>
      <FieldContainer>
        <FieldLabel>Description</FieldLabel>
        <DescriptionField value={description} onChange={handleDescriptionChange} />
      </FieldContainer>
      <ButtonContainer>
        <Button
          width={120}
          height={40}
          hoverColor={COLORS.darkPrimary}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
        <Button
          width={120}
          height={40}
          backgroundColor={COLORS.white}
          fontColor={COLORS.primary}
          borderColor={COLORS.lightGrey}
          borderWidth={1}
          onClick={handleClose}
        >
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

const NameField = styled.input`
  width: 328px;
  height: 23px;
  font-size: 15px;
  padding: 2px 10px;
`;

const DescriptionField = styled.textarea`
  width: 300px;
  outline: none !important;
  resize: none;
  height: 85px;
  padding: 10px;
  width: 328px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu";
  font-size: 15px;
  &:focus {
    border: 1px solid ${COLORS.primary};
  }
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
  margin-top: 50px;
`;

export { PlaylistModal };
