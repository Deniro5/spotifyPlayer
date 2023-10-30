import React from "react";
import LoadingWheel from "../../../assets/loadingwheel.gif";
import styled from "styled-components";

interface LoaderProps {
  text?: string;
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <LoaderContainer>
      <LoaderImg height={35} width={35} src={LoadingWheel} alt='' />
      <LoaderText>{text || "loading"}</LoaderText>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: 500;
  font-size: 16px;
  height: 90px;
  width: 90px;
`;

const LoaderImg = styled.img``;

const LoaderText = styled.p`
  margin-top: 10px;
`;

export default Loader;
