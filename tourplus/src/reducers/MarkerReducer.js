import { MARKERS_FETCH_SUCCESS, MARKERS_FETCH, GUIDE_MARKER_FETCH_SUCCESS, TOURIST_MARKERS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  markers: [],
  guide: null,
  tourist: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MARKERS_FETCH:
      return { ...state, loading: true };
    case MARKERS_FETCH_SUCCESS:
      return { ...state, loading: false, markers: action.payload };
    case GUIDE_MARKER_FETCH_SUCCESS:
      return { ...state, loading: false, guide: action.guide }
    case TOURIST_MARKERS_FETCH_SUCCESS:
      return { ...state, loading: false, tourist: action.tourist }
    default:
      return state;
  }
};