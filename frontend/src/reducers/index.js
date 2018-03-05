const initialState = {
  fetchLocations: 'none',
  fetchMap: 'none',
  locations: [],
  map: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LOCATIONS': return {...state, fetchLocations : action.payload};
    case 'FETCH_MAP': return {...state, fetchMap : action.payload};
    case 'SAVE_LOCATIONS': return {...state, locations : action.payload};
    case 'SAVE_MAP': return {...state, map : action.payload};
    default:
        return state;
  }
};
export default rootReducer;
