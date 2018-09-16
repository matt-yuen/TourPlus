import { IMAGES_FETCH_SUCCESS, IMAGES_FETCH } from '../actions/types';

const INITIAL_STATE = {
	images: [],
	loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case IMAGES_FETCH:
      return { ...state, loading: true };
    case IMAGES_FETCH_SUCCESS:
      return { ...state, loading: false, images: action.payload };
    default:
      return state;
  }
};
