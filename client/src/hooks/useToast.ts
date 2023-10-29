import { useAppDispatch } from "../hooks";
import { setToast } from "../redux/slices/playerSlice";
import { ToastType } from "../types";

const useToast = () => {
  const dispatch = useAppDispatch();

  const setToastHelper = (message: string, duration?: number) => {
    dispatch(setToast({ message, type: ToastType.MESSAGE, duration }));
  };

  const setErrorHelper = (message: string, duration?: number) => {
    dispatch(setToast({ message, type: ToastType.ERROR, duration }));
  };

  return { setToastHelper, setErrorHelper };
};

export default useToast;
