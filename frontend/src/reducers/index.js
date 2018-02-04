import { SELECT_STORE } from "../constants/action-types";
const initialState = {
  store: ''
};
const rootReducer = (state = initialState, action) => {

  switch (action.type) {
    case SELECT_STORE:
      return { ...state, store: action.payload};
    default: return state;
  }

};
export default rootReducer;
