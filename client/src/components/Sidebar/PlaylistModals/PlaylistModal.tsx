import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { COLORS } from "../../../constants";
import Button from "../../Common/Button";
import { isAlphaNumeric } from "../../../utils";
export type IPlaylistModalProps = {
  isOpen: boolean;
  initialName?: string;
  initialDescription?: string;
  title: string;
  handleClose: () => void;
  onSubmit: (name: string, description: string) => void;
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
  initialName,
  initialDescription,
  title,
  handleClose,
  onSubmit,
}: IPlaylistModalProps) => {
  const [name, setName] = useState(initialName || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const isValid = () => {
    if (!name.length) {
      setError("Name field cannot be blank");
      return false;
    } else if (!isAlphaNumeric(name) || !isAlphaNumeric(description)) {
      setError("Invalid characters in name/description field");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = () => {
    console.log(name, description);
    if (!isValid()) return;
    onSubmit(name, description);
  };

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
          onClick={handleSubmit}
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
