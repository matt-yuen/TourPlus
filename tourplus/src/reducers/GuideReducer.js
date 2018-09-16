import { GUIDE_LIST_FETCH_SUCCESS, GUIDE_LIST_FETCH } from '../actions/types';

const INITIAL_STATE = {
	guideList: [],
	loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case GUIDE_LIST_FETCH:
      return { ...state, loading: true };
    case GUIDE_LIST_FETCH_SUCCESS:
      return { ...state, loading: false, guideList: action.payload };
    default:
      return state;
  }
};
