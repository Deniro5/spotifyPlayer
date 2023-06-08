import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { COLORS } from "../../../constants";
import Button from "../../Common/Button";
import { useAppSelector } from "../../../hooks";
import { useState } from "react";
import { batch, useDispatch } from "react-redux";
import { setShowRecommendations } from "../../../redux/slices/playerSlice";

export type ISettingsModalProps = {
  handleCloseSettingsModal: () => void;
  isOpen: boolean;
};

const SettingsModal: React.FC<ISettingsModalProps> = ({
  handleCloseSettingsModal,
  isOpen,
}) => {
  const dispatch = useDispatch();
  const showRecommendations = useAppSelector((state) => state.player.showRecommendations);
  const [tempShowRecommendations, setTempShowRecommendations] =
    useState(showRecommendations);
  const customModalStyle = {
    content: {
      width: "350px",
      height: "360px",
      left: "calc(50% - 196px)",
      top: "calc(50% - 250px)",
    },
  };

  const handleConfirm = () => {
    batch(() => {
      dispatch(setShowRecommendations(tempShowRecommendations));
      //Whatever else
    });
    handleCloseSettingsModal();
  };

  const handleChangeRecommendations = () => {
    setTempShowRecommendations(!tempShowRecommendations);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseSettingsModal}
      style={customModalStyle}
    >
      <Title> Settings </Title>
      <SettingsRow>
        <SettingsLabel> Show Recommendations</SettingsLabel>
        <CheckboxContainer>
          <StyledCheckbox
            type='checkbox'
            checked={tempShowRecommendations}
            onChange={handleChangeRecommendations}
          />
        </CheckboxContainer>
      </SettingsRow>
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
          onClick={handleCloseSettingsModal}
        >
          Cancel
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

const Title = styled.h2`
  margin-top: 0;
  text-align: center;
`;

const SettingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  width: 90%;
  margin: auto;
  border-bottom: whitesmoke 1px solid;
`;

const SettingsLabel = styled.p`
  font-size: 14px;
  margin-left: 7px;
`;

const CheckboxContainer = styled.div`
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  height: 16px;
  width: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 270px;
  margin: auto;
  margin-top: 50px;
`;

export { SettingsModal };
