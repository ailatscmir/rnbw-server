const initialState = {
  selectedArea: ''
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_AREA': return {...state, selectedArea : action.payload}
    default:
        return state;
  }

};
export default rootReducer;
