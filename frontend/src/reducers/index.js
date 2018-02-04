const initialState = {
  selectedStore: '',
  storesArray: []
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EXEC_TEST':
      return {...state,selectedStore: action.payload};
    case 'EXEC_TEST2':
      return {...state,storesArray: action.payload};
    default:
        return state;
  }

};
export default rootReducer;
