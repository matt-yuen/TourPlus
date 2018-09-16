import firebase from 'firebase';
import geolib from 'geolib';
import {
  MARKERS_FETCH,
  MARKERS_FETCH_SUCCESS,
  GUIDE_MARKER_FETCH_SUCCESS,
  TOURIST_MARKERS_FETCH_SUCCESS 
} from './types';

export const markersFetch = () => {
  //const { currentUser } = firebase.auth();

  return (dispatch) => {
    //firebase.database().ref(`/users/${currentUser.uid}/cars`)
    firebase.database().ref(`/users`)
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
          var photo = childSnapshot.val().photo;
          //console.log(childData.position);
          tasks.push(childSnapshot.val());
          tasks1.push({
            position: childData,
            key: key,
            photo: photo
          });//.push(childData, key);
        });
        dispatch({ type: MARKERS_FETCH_SUCCESS, payload: tasks1 });
        console.log(tasks1);
      });
  };
};

export const markersFetch1 = (team) => {
  //const { currentUser } = firebase.auth();

  var guide = null;
  
  return (dispatch) => {
    //get the guide

    firebase.database().ref(`/users/${team.guide}`)
      .on('value', snapshot => {
        var tasks = [];
        var tasks1 = [];

        //dispatch({ type: MARKERS_FETCH_SUCCESS, payload: snapshot.toJSON() });
        //console.log(snapshot.val());
        guide = snapshot.val();
        //console.log(7888);
        //console.log(mapTeam);
        dispatch({ type: GUIDE_MARKER_FETCH_SUCCESS, guide: guide });
      });
      //get tourist
      var tourists = []
      firebase.database().ref(`/users`)
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
          var photo = childSnapshot.val().photo;
          //console.log(childData.position);
          tasks.push(childSnapshot.val());
          tasks1.push({
            position: childData,
            key: key,
            photo: photo
          });//.push(childData, key);
        });
        dispatch({ type: TOURIST_MARKERS_FETCH_SUCCESS, tourist: tasks1 });
        //console.log(tasks1);
      });
  };
};

export const markerCreate = (position) => {
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

export const sendNotification = (positionG, positionT, guideNotifToken) => {
  return (dispatch) => {
        var dist = geolib.getDistance(positionG,positionT);
        console.log(dist);
        if (dist > 100)
        {
          const { currentUser } = firebase.auth();
          const uid = currentUser.uid;
          console.log(dist,uid);
          firebase.database().ref(`/users/${uid}`)
            .once('value', snapshot => {
              var touristNotifToken = snapshot.val().notifToken;
              //console.log(notifToken);

              fetch('https://murmuring-tor-75411.herokuapp.com/notifications', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                touristNotifToken: touristNotifToken,
                guideNotifToken: guideNotifToken
              })
            }).then(response => {
              console.log(22);
              console.log(response);
            })
              .catch((error) => {
                console.log('ERROR', error)
              });
            });
        }
        
  }
};