import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { COLORS } from "../../../constants";
import Button from "../../Common/Button";
import { useAppSelector } from "../../../hooks";
import { useState } from "react";
import { batch, useDispatch } from "react-redux";
import {
  setShowRecommendations,
  setShouldUseRecommendationSliders,
  setRecommendationSettings,
} from "../../../redux/slices/playerSlice";

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
  const shouldUseRecommendationSliders = useAppSelector(
    (state) => state.player.shouldUseRecommendationSliders
  );
  const recommendationSettings = useAppSelector(
    (state) => state.player.recommendationSettings
  );

  const [tempShowRecommendations, setTempShowRecommendations] =
    useState(showRecommendations);
  const [tempShouldUseRecommendationSliders, setTempShouldUseRecommendationSliders] =
    useState(shouldUseRecommendationSliders);
  const [tempPopularity, setTempPopularity] = useState(recommendationSettings.popularity);
  const [tempTempo, setTempTempo] = useState(recommendationSettings.tempo);
  const [tempInstrumentalness, setTempInstrumentalness] = useState(
    recommendationSettings.instrumentalness
  );
  const [tempValence, setTempValence] = useState(recommendationSettings.valence);
  const customModalStyle = {
    content: {
      width: "350px",
      height: "475px",
      left: "calc(50% - 196px)",
      top: "calc(50% - 250px)",
    },
  };

  const handleConfirm = () => {
    batch(() => {
      dispatch(setShowRecommendations(tempShowRecommendations));
      dispatch(setShouldUseRecommendationSliders(tempShouldUseRecommendationSliders));
      if (tempShouldUseRecommendationSliders) {
        dispatch(
          setRecommendationSettings({
            valence: tempValence,
            popularity: tempPopularity,
            tempo: tempTempo,
            instrumentalness: tempInstrumentalness,
          })
        );
      }
    });
    handleCloseSettingsModal();
  };

  const handleChangeRecommendations = () => {
    if (tempShowRecommendations) {
      //turn off recommendation sliders if recommendations are going to be turned off
      setTempShouldUseRecommendationSliders(false);
    }
    setTempShowRecommendations(!tempShowRecommendations);
  };

  const handleChangeShouldUseRecommendationSliders = () => {
    setTempShouldUseRecommendationSliders(!tempShouldUseRecommendationSliders);
  };

  const handlePopularityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempPopularity(Number.parseInt(e.target.value));
  };

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTempo(Number.parseInt(e.target.value));
  };

  const handleInstrumentalnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempInstrumentalness(Number.parseInt(e.target.value));
  };

  const handleValenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValence(Number.parseInt(e.target.value));
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
      <SettingsRow>
        <SettingsLabel> Use Recommendation Sliders</SettingsLabel>
        <CheckboxContainer>
          <StyledCheckbox
            type='checkbox'
            checked={tempShouldUseRecommendationSliders}
            onChange={handleChangeShouldUseRecommendationSliders}
          />
        </CheckboxContainer>
      </SettingsRow>
      <SlidersContainer isDisabled={!tempShouldUseRecommendationSliders}>
        <SettingsRow>
          <SettingsLabel>Popularity </SettingsLabel>
          <input
            onChange={handlePopularityChange}
            type='range'
            min='1'
            max='100'
            value={tempPopularity}
            id='myRange'
          />
        </SettingsRow>
        <SettingsRow>
          <SettingsLabel> Tempo </SettingsLabel>
          <input
            onChange={handleTempoChange}
            type='range'
            min='1'
            max='140'
            value={tempTempo}
            id='myRange'
          />
        </SettingsRow>
        <SettingsRow>
          <SettingsLabel> Happiness </SettingsLabel>
          <input
            onChange={handleValenceChange}
            type='range'
            min='1'
            max='100'
            value={tempValence}
            id='myRange'
          />
        </SettingsRow>
        <SettingsRow>
          <SettingsLabel> Instrumentalness </SettingsLabel>
          <input
            onChange={handleInstrumentalnessChange}
            type='range'
            min='1'
            max='100'
            value={tempInstrumentalness}
            id='myRange'
          />
        </SettingsRow>
      </SlidersContainer>
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

const SlidersContainer = styled.div<{ isDisabled: boolean }>`
  width: 90%;
  margin: auto;
  ${({ isDisabled }) =>
    isDisabled &&
    `
    background: whitesmoke;
    pointer-events:none;
    ${SettingsRow} {
      color: gray;
    }


  `}
`;

export { SettingsModal };
