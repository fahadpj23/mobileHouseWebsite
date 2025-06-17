import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../store/index";

// Custom hook for dispatch with proper typing
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for selecting state with proper typing
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
