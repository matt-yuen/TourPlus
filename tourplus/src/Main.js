import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Permissions, Notifications } from 'expo';
import reducers from './reducers';
import Router from './Router';

export default class Main extends React.Component {
  state = {
    notification: {},
  };

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    return;
  }


  async componentWillMount() {
    var config = {
      apiKey: 'AIzaSyBDvy19tFzSiVJrT-byzOhkc22XvxtTG4A',
      authDomain: 'tourplus-1023d.firebaseapp.com',
      databaseURL: 'https://tourplus-1023d.firebaseio.com',
      projectId: 'tourplus-1023d',
      storageBucket: 'tourplus-1023d.appspot.com',
      messagingSenderId: '929392319416'
    };
    firebase.initializeApp(config);

    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    //this.setState({notification: notification});
    console.log(notification);
  };

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
