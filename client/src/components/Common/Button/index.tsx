import React from "react";
import styled from "styled-components";
import { COLORS } from "../../../constants";
interface ButtonProps {
  children: React.ReactNode;
  width: number;
  height: number;
  onClick?: () => any;
  backgroundColor?: string;
  hoverColor?: string;
  fontSize?: number;
  fontWeight?: number;
  borderRadius?: number;
  fontColor?: string;
  borderColor?: string;
  borderWidth?: number;
  isDisabled?: boolean;
  disabledBackgroundColor?: string;
  disabledFontColor?: string;
  disabledBorderColor?: string;
}

function Button({
  children,
  width = 110,
  height = 40,
  onClick,
  backgroundColor = COLORS.primary,
  hoverColor = backgroundColor,
  fontSize = 16,
  fontWeight = 600,
  borderRadius = 4,
  fontColor = COLORS.white,
  borderColor = "none",
  borderWidth = 0,
  isDisabled = false,
  disabledBackgroundColor = COLORS.lightGrey,
  disabledFontColor = COLORS.black,
  disabledBorderColor = "none",
}: ButtonProps) {
  return (
    <StyledButton
      width={width}
      height={height}
      fontSize={fontSize}
      onClick={onClick}
      hoverColor={hoverColor}
      backgroundColor={backgroundColor}
      fontWeight={fontWeight}
      borderRadius={borderRadius}
      fontColor={fontColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      isDisabled={isDisabled}
      disabledBackgroundColor={disabledBackgroundColor}
      disabledFontColor={disabledFontColor}
      disabledBorderColor={disabledBorderColor}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.div<ButtonProps>`
  background: ${({ backgroundColor, disabledBackgroundColor, isDisabled }) =>
    isDisabled ? disabledBackgroundColor : backgroundColor};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  color: ${({ fontColor, disabledFontColor, isDisabled }) =>
    isDisabled ? disabledFontColor : fontColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  cursor: pointer;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  font-weight: ${({ fontWeight }) => `${fontWeight}`};
  &:hover {
    background: ${({ hoverColor }) => hoverColor};
  }
  border: ${({ borderWidth, borderColor, isDisabled, disabledBorderColor }) =>
    `${borderWidth}px solid ${isDisabled ? disabledBorderColor : borderColor} `};
  pointer-events: ${({ isDisabled }) => isDisabled && "none"};
`;

export default Button;
