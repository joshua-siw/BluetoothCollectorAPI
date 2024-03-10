import { store } from "..";

export * from "./branches/auth/interfaces";
export * from "./branches/user/interfaces";

export type RootState = ReturnType<typeof store.getState>;
