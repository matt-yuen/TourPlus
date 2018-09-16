import firebase from 'firebase';
import {
  IMAGES_FETCH,
  IMAGES_FETCH_SUCCESS,
} from './types';

export const imagesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/images`)
    //firebase.database().ref(`/users`)
      .on('value', snapshot => {
        var tasks = [];
        var tasks1 = [];
        //dispatch({ type: MARKERS_FETCH_SUCCESS, payload: snapshot.toJSON() });
        //console.log(snapshot);
        snapshot.forEach(function (childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childData = childSnapshot.val().position;
          var photo = childSnapshot.val().url;
          //console.log(childData.position);
          tasks.push(childData);
          tasks1.push({
            position: childData,
            key: key,
            photo: photo
          });//.push(childData, key);
        });
        dispatch({ type: IMAGES_FETCH_SUCCESS, payload: tasks1 });
        console.log(tasks1);
      });
  };
};

export const albumCreate = (position) => {
  const { currentUser } = firebase.auth();
  const owner = currentUser.uid;

  return (dispatch) => {
    firebase.database().ref(`/users/${owner}/position`)
      .set(position)
      .then(() => {
        //dispatch({ type: CAR_CREATE });
        //Actions.carList({ type: 'reset' });
      });
  };
};