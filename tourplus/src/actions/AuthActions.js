import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { Permissions, Notifications } from 'expo';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CLOSE_ERROR,
} from './types';


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const closeError = () => {
  return {
    type: CLOSE_ERROR,
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = (email, password, navigation) => {
  return (dispatch) => {

    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, navigation))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user, navigation))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

export const logOutUser = (navigation) => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Auth');
    } catch (e) {
      console.log(e);
    }
    
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = async (dispatch, user, navigation) => {
  console.log(888);
  console.log(user.user.uid);
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  firebase.database().ref(`/users/${user.user.uid}/notifToken`)
    .set(token);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  navigation.navigate('App');
};
