import firebase from 'firebase';
import {
  TOURIST_LIST_FETCH,
  TOURIST_LIST_FETCH_SUCCESS,
} from './types';

export const touristListFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    var tasks1 = [];
    firebase.database().ref(`/users/${currentUser.uid}/touristList`)
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
            console.log(snapshot1.val());
            tasks1.push(snapshot1.val());
            //console.log(tasks1);
            dispatch({ type: TOURIST_LIST_FETCH_SUCCESS, payload: tasks1 });
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

export const touristCreate = (position) => {
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

export const joinTeam = (name) => {
  const { currentUser } = firebase.auth();
  const owner = currentUser.uid;

  return (dispatch) => {
    firebase.database().ref().child('teams').orderByChild('name').equalTo(name).on("child_added", function(snapshot) {
      console.log(snapshot.key);
      firebase.database().ref(`/teams/${snapshot.key}/tourist`)
      .push({id:owner}).then((data) => {
          console.log(data.key);
      });
      firebase.database().ref(`/users/${owner}/touristList`)
            .push({team:snapshot.key});
    });

    /*firebase.database().ref(`/teams`)
      .push({name:name, guide: owner}).then((data) => {
          console.log(data.key);
          firebase.database().ref(`/users/${owner}/guideList`)
            .push({team:data.key});
      });*/
      
    /*firebase.database().ref(`/users/${owner}/guideList`)
      .push({name:name});*/

  };
};