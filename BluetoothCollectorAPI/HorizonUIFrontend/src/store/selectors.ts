import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "./interfaces";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
