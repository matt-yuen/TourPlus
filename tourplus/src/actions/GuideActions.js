import firebase from 'firebase';
import {
  GUIDE_LIST_FETCH,
  GUIDE_LIST_FETCH_SUCCESS,
} from './types';

export const guideListFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    var tasks1 = [];
    firebase.database().ref(`/users/${currentUser.uid}/guideList`)
      .on('value',(snapshot) => {
        var tasks = [];
        
        //dispatch({ type: MARKERS_FETCH_SUCCESS, payload: snapshot.toJSON() });
        //console.log(snapshot);
        snapshot.forEach(function (childSnapshot) {
          //console.log(snapshot);
          //console.log(childSnapshot);
          //console.log(childSnapshot.val().team);
          firebase.database().ref(`/teams/${childSnapshot.val().team}`)
          .on('value', snapshot1 => {
            //console.log(snapshot1.val());
            tasks1.push(snapshot1.val());
            console.log(tasks1);
            dispatch({ type: GUIDE_LIST_FETCH_SUCCESS, payload: tasks1 });
          });
          // key will be "ada" the first time and "alan" the second time
          /*var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childData = childSnapshot.val().position;
          var photo = childSnapshot.val().url;
          //console.log(childData.position);
          tasks.push(childData);
          tasks1.push({
            position: childData,
            key: key,
            photo: photo
          });//.push(childData, key);*/
        });
        //dispatch({ type: IMAGES_FETCH_SUCCESS, payload: tasks1 });
        //console.log(tasks1);
      });
      //console.log(tasks1);
  };
};

export const guideCreate = (name) => {
  const { currentUser } = firebase.auth();
  const owner = currentUser.uid;

  return (dispatch) => {
    firebase.database().ref(`/teams`)
      .push({name:name, guide: owner}).then((data) => {
          console.log(data.key);
          firebase.database().ref(`/users/${owner}/guideList`)
            .push({team:data.key});
      });
      
    /*firebase.database().ref(`/users/${owner}/guideList`)
      .push({name:name});*/

  };
};