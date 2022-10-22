import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export type IPopoverContentWrapperProps = {
  children: React.ReactNode;
  width?: number;
};

const PopoverContentWrapper: React.FC<IPopoverContentWrapperProps> = ({
  children,
  width = 200,
}) => {
  return <MenuContainer width={width}>{children}</MenuContainer>;
};

const MenuContainer = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: ${COLORS.white};
`;

export { PopoverContentWrapper };
