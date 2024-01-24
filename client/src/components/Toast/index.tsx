/// <reference types="vite-plugin-svgr/client" />
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { COLORS, DEFAULT_TOAST_DURATION } from "../../constants";
import CloseIcon from "../../assets/close.svg?react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getToast } from "../../redux/selectors";
import { ToastType } from "../../types";
import { setToast } from "../../redux/slices/AppSlice/appSlice";

const Toast = ({}) => {
  const toast = useAppSelector(getToast);
  const dispatch = useAppDispatch();

  const closeToast = useCallback(() => {
    dispatch(setToast(null));
  }, [dispatch]);

  useEffect(() => {
    if (!toast) return;
    setTimeout(() => closeToast(), toast.duration || DEFAULT_TOAST_DURATION);
  }, [toast, closeToast]);

  return (
    <ToastContainer show={!!toast} type={toast?.type}>
      {toast?.message}
      <CloseIconContainer onClick={closeToast}>
        <CloseIcon height={18} width={18} fill={COLORS.white} />
      </CloseIconContainer>
    </ToastContainer>
  );
};

export const ToastContainer = styled.div<{
  show: boolean;
  type: ToastType | undefined;
}>`
  position: absolute;
  top: ${({ show }) => (show ? "20px" : "-80px")};
  border-radius: 4px;
  width: 80%;
  max-width: 300px;
  font-weight: 600;
  right: 20px;
  min-height: 45px;
  padding: 5px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: white;
  background: ${({ type }) =>
    type === "message" ? COLORS.green : type === "error" ? COLORS.red : ""};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
`;

export const CloseIconContainer = styled.div`
  position: absolute;
  right: 5px;
  top: 7px;
  cursor: pointer;
`;

export default Toast;
