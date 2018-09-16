import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MarkerReducer from './MarkerReducer';
import AlbumReducer from './AlbumReducer';
import GuideReducer from './GuideReducer';
import TouristReducer from './TouristReducer';

export default combineReducers({
  auth: AuthReducer,
  markersState: MarkerReducer,
  albumState: AlbumReducer,
  guideListState: GuideReducer,
  touristListState: TouristReducer,
});
