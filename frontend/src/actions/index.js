import { SELECT_STORE } from "../constants/action-types";
export const selectStore = storePath => ({ type: SELECT_STORE, payload: storePath });
