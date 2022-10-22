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
}

function Button({
  children,
  width = 110,
  height = 40,
  onClick,
  hoverColor = COLORS.primary,
  backgroundColor = COLORS.primary,
  fontSize = 16,
  fontWeight = 600,
  borderRadius = 4,
  fontColor = COLORS.white,
  borderColor = "none",
  borderWidth = 0,
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
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.div<ButtonProps>`
  background: ${({ backgroundColor }) => backgroundColor};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  color: ${({ fontColor }) => `${fontColor}`};
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
  border: ${({ borderWidth, borderColor }) => `${borderWidth}px solid ${borderColor} `};
`;

export { Button };
