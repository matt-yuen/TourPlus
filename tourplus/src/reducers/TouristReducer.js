import { TOURIST_LIST_FETCH_SUCCESS, TOURIST_LIST_FETCH } from '../actions/types';

const INITIAL_STATE = {
	touristList: [],
	loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case TOURIST_LIST_FETCH:
      return { ...state, loading: true };
    case TOURIST_LIST_FETCH_SUCCESS:
      return { ...state, loading: false, touristList: action.payload };
    default:
      return state;
  }
};
