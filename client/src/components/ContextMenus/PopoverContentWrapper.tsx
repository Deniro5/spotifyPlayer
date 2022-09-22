import React from "react";
import styled from "styled-components";

export type IPopoverContentWrapperProps = {
  children: React.ReactNode;
};

const PopoverContentWrapper: React.FC<IPopoverContentWrapperProps> = ({ children }) => {
  return <MenuContainer>{children}</MenuContainer>;
};

const MenuContainer = styled.div`
  width: 200px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: white;
`;

export { PopoverContentWrapper };
