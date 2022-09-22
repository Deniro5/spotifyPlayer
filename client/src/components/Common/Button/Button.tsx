import React from "react";
import styled from "styled-components";

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
}

function Button({
  children,
  width = 110,
  height = 40,
  onClick,
  hoverColor = "blue",
  backgroundColor = "blue",
  fontSize = 16,
  fontWeight = 600,
  borderRadius = 2,
  fontColor = "white",
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
      fontColor={fontColor}>
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
`;

export { Button };
