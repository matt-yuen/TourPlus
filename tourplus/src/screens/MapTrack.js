import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Platform, StatusBar, FlatList, Dimensions } from 'react-native';
import { MapView, Marker } from 'expo';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Left,
    Right,
    Icon,
    Button,
    Thumbnail,
    Body,
    Title,
    ListItem
} from 'native-base';
import { markerCreate, markersFetch1, sendNotification } from '../actions';
import colors from '../styles/colors';

class MapTrack extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header style={[{
                ...Platform.select({
                    android: {
                        marginTop: StatusBar.currentHeight
                    }
                }), backgroundColor: colors.default
            }]}>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' style={{ fontSize: 30 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Map</Title>
                </Body>
                <Right/>
            </Header>
        ),
    });
    constructor(props) {
        super(props);
        this.state = {
            tripMap: this.props.navigation.getParam('tripMap'),
            markers: [],
            region: null,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            guide: null,
            tourist: [],
        }
    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
          pos => {
            console.log(pos.coords.latitude+';'+pos.coords.longitude);
            
            this.setState({region: {latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034}});
            //this.props.markerCreate({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
          },
          err => {
            console.log(err);
          }
        );
        this.props.markersFetch1(this.state.tripMap);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ guide: nextProps.guide, tourist: nextProps.tourist });
    }

    _press = (e) => {
      console.log(189);
        if (e.coordinate.speed > 0) {
          console.log(189);
          //console.log(e.coordinate.latitude);
          //this.props.markerCreate({ latitude: e.coordinate.latitude, longitude: e.coordinate.longitude });
        }
      }
    onPress = (e) => {
        this.props.markerCreate({ latitude: e.coordinate.latitude, longitude: e.coordinate.longitude });
        var token = this.state.guide.notifToken;
        this.props.sendNotification(this.state.guide.position, e.coordinate, token);
    }
    render() {
        return (
            <Container>
                {this.state.region ?
                <MapView
                    showsUserLocation
                    provider="google"
                    onPress={e => this.onPress(e.nativeEvent)}
                    followsUserLocation
                    onUserLocationChange={event => this._press(event.nativeEvent)}
                    style={{ flex: 1 }}
                    initialRegion={this.state.region}
                  >
                  {this.state.guide ? 
                                      this.state.guide.position ?
                                        <View >
                                            <MapView.Circle
                                                center={this.state.guide.position}
                                                radius={100}
                                                strokeColor="#0366d6"
                                                fillColor="#0366d642"
                                            />
                                            <MapView.Marker
                                              coordinate={this.state.guide.position}
                                            >
                                              <Thumbnail source={{ uri: this.state.guide.photo }} />
                                            </MapView.Marker>
                                        </View>
                                        :null
                                      : null
                                     }
                                      {
                                          this.state.tourist.map((tourist, index) => (
                                            tourist.position ?
                                            <View key={index}>
                                              <MapView.Marker
                                                coordinate={tourist.position}
                                              >
                                                <Thumbnail source={{ uri: tourist.photo }} />
                                              </MapView.Marker>
                                            </View>
                                            : null
                                          
                                          ))
                                          
                                      }

                  </MapView>
                  : 
                  null
                }
            </Container>

        );
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
  const { tourist, guide } = state.markersState;

  return { tourist, guide };
};

export default connect(mapStateToProps, { markerCreate, markersFetch1, sendNotification })(MapTrack);
