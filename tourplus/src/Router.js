import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, YellowBox } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import {
  Icon,
  Button,
  Header,
  Left,
  Body,
  Right,
  Title,
  Item,
  Input
} from 'native-base';

import Login from './screens/Login';
import Home from './screens/Home';
import Camera from './screens/Camera';
import Album from './screens/Album';
import GuideList from './screens/GuideList';
import TouristList from './screens/TouristList';
import MapTrack from './screens/MapTrack';
import SideBar from './components/SideBar';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import colors from './styles/colors';

YellowBox.ignoreWarnings(['Setting a timer']);


const MainScreen = createStackNavigator(
  {
    Main: {
      screen: Home,
      navigationOptions: {
        headerStyle: {
          backgroundColor: colors.default,
          elevation: 0
        },
        headerTintColor: colors.white,
      }
    },
    Camera: {
      screen: Camera,
      headerMode: 'none',
      navigationOptions: {
        header: null,
      }
    },
    Album: Album,
    GuideList: GuideList,
    TouristList: TouristList,
    MapTrack: MapTrack,
  },
  {
    initialRouteName: 'Main',
  }
);

const Drawer = createDrawerNavigator(
  {
    Main: MainScreen,
  },
  {
    contentComponent: SideBar
  }
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Drawer,
    Auth: Login,
    
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
