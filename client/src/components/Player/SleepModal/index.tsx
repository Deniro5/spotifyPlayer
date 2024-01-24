import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { COLORS } from "../../../constants";
import Button from "../../Common/Button";
import { useDispatch } from "react-redux";
import {
  clearSleepTimer,
  decrementSleepTimerMinutes,
  setSleepTimer,
  setSleepTimerMinutes,
} from "../../../redux/slices/PlayerSlice/playerSlice";
import { useAppSelector } from "../../../hooks";
import { getSleepTimer } from "../../../redux/slices/PlayerSlice/selectors";

export type ISleepModalProps = {
  handleCloseSleepModal: () => void;
  isOpen: boolean;
};

const SleepModal: React.FC<ISleepModalProps> = ({
  handleCloseSleepModal,
  isOpen,
}) => {
  const dispatch = useDispatch();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const sleepTimer = useAppSelector(getSleepTimer);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newHours = parseInt(value, 10);
    setHours(newHours);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(e.target.value, 10);
    setMinutes(newMinutes);
  };

  const handleConfirm = () => {
    const timerMinutes = minutes + hours * 60;
    dispatch(setSleepTimerMinutes(timerMinutes));
    handleSetTimer();
    handleCloseSleepModal();
  };

  const handleSetTimer = () => {
    if (sleepTimer) {
      clearInterval(sleepTimer);
    }
    const newTimer = setInterval(() => {
      dispatch(decrementSleepTimerMinutes());
    }, 60000);
    dispatch(setSleepTimer(newTimer));
  };

  const handleClearTimer = () => {
    dispatch(clearSleepTimer());
  };

  const customModalStyle = {
    content: {
      width: "350px",
      height: "240px",
      left: "calc(50% - 196px)",
      top: "calc(50% - 250px)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseSleepModal}
      style={customModalStyle}
    >
      <Title> Sleep Timer </Title>
      <FormContainer>
        <FieldContainer>
          <label htmlFor="hours">Hours:</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={hours}
            onChange={handleHoursChange}
          />
        </FieldContainer>
        <FieldContainer>
          <label htmlFor="minutes">Minutes:</label>
          <input
            type="number"
            id="minutes"
            name="minutes"
            value={minutes}
            onChange={handleMinutesChange}
          />
        </FieldContainer>
      </FormContainer>
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
          onClick={handleCloseSleepModal}
        >
          Cancel
        </Button>
      </ButtonContainer>
      <CancelButtonContainer>
        <Button
          width={270}
          height={40}
          backgroundColor={COLORS.red}
          fontColor={COLORS.white}
          onClick={handleClearTimer}
          isDisabled={!sleepTimer}
        >
          Clear Timer
        </Button>
      </CancelButtonContainer>
    </Modal>
  );
};

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

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  input[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
  }

  /* For Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  input {
    width: 50px;
    margin: 0 5px;
    height: 25px;
    padding: 0 5px;
  }
`;

const CancelButtonContainer = styled.div`
  margin-left: 39px;
  margin-top: 20px;
`;

export { SleepModal };
