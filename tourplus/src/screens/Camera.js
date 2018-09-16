import React from 'react';
import firebase from 'firebase';
import Base64 from 'base-64';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import {
  Container,
  Content,
  Header,
  Item,
  Input,
  Left,
  Right,
  Icon,
  Spinner,
  Button,
  Thumbnail
} from 'native-base';

import { markerCreate, markersFetch, logOutUser } from '../actions';
const BASE_URL = 'https://murmuring-tor-75411.herokuapp.com';

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      userId: firebase.auth().currentUser.uid,
      page: this.props.navigation.getParam('page'),
      loading: false
    }
  }

  reverseCamera = () => {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }


  takePicture = async () => {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var name = uuidv1();
    var user = this.state.userId;
    var mountainsRef = storageRef.child(`images/${name}.jpg`);
    var page = this.state.page;
    const setLoading = () => {
      this.setState({loading: false});
    }
    if (this.camera) {
      this.setState({loading: true});
      let photo = await this.camera.takePictureAsync({ quality: 0.9 });
      //console.log(photo.base64);
      global.atob = Base64.encode;

      const response = await fetch(photo.uri);
      const blob = await response.blob();
      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      };
      var uploadTask = mountainsRef.put(blob, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed', function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused': // or 'paused'
            console.log('Upload is paused');
            break;
          case 'running': // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {
        console.log(error);
      }, function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          //this.setState({loading: false});
          setLoading();
          console.log('File available at', downloadURL);
            if(page == 'album')
            {
              fetch(`${BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  image: downloadURL,
                  userId: user
                })
              }).then(response => {
                console.log(22);
                console.log(response);
              })
                .catch((error) => {
                  console.log('ERROR', error)
                });
            }
            else {
              fetch(`${BASE_URL}/enroll`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  image: downloadURL,
                  userId: user
                })
              }).then(response => {
                console.log(22);
                console.log(response);
              })
                .catch((error) => {
                  console.log('ERROR', error)
                });
            }


        });
      });
    }
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1, justifyContent: 'space-between' }} type={this.state.type}>
            <Header transparent>
              <Left>
                <Button icon transparent onPress={() => this.props.navigation.goBack()} >
                  <Icon name="arrow-back" style={{ color: 'white', fontSize: 30 }} />
                </Button>
              </Left>
              <Right>
                <Button icon transparent >
                  <Icon name="ios-flash" style={{ color: 'white', fontSize: 30 }} />
                </Button>
                <Button icon transparent onPress={() => this.reverseCamera()} >
                  <Icon name="ios-reverse-camera" style={{ color: 'white', fontSize: 30 }} />
                </Button>
              </Right>
            </Header>


            <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>
              <Icon type='MaterialCommunityIcons' name='message-reply' style={{ color: 'white', fontSize: 36 }} />
              <View style={{ alignItems: 'center' }}>
                <Button icon transparent large disabled={this.state.loading} onPress={() => this.takePicture()}>
                  <Icon type='MaterialCommunityIcons' name='circle-outline' style={{ color: 'white', fontSize: 80 }} />
                </Button>
                {this.state.loading ?
                  <Spinner />
                  : null
                }
              </View>
              <Icon type='MaterialCommunityIcons' name='google-circles-communities' style={{ color: 'white', fontSize: 36 }} />
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  const { markers } = state.markersState;

  return { markers };
};

export default connect(mapStateToProps, { markersFetch, markerCreate, logOutUser })(CameraScreen);

