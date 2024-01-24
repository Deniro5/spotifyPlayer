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
  error: string | null;
};

const customModalStyle = {
  content: {
    width: "350px",
    height: "380px",
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
  error,
}: IPlaylistModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customModalStyle}
    >
      <Title>{title}</Title>
      <Error> {error || ""} </Error>
      <Fields>
        <FieldContainer>
          <FieldLabel>Name</FieldLabel>
          <NameField value={name} onChange={handleNameChange} />
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Description</FieldLabel>
          <DescriptionField
            value={description}
            onChange={handleDescriptionChange}
          />
        </FieldContainer>
      </Fields>
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

const Fields = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Error = styled.div`
  color: ${COLORS.red};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  margin: -10px;
  height: 20px;
`;

const FieldContainer = styled.div``;

const FieldLabel = styled.p`
  font-weight: 600;
  margin-bottom: 10px;
`;

const NameField = styled.input`
  width: 300px;
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu";
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
  margin-top: 40px;
`;

export default PlaylistModal;
