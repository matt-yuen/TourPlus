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
} from 'native-base';
import { imageCreate, imagesFetch, logOutUser } from '../actions';
import colors from '../styles/colors';
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

class Album extends React.Component {
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
                    <Title>Album</Title>
                </Body>
            </Header>
        ),
    });
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            marker: {
                latitude: 36.746946881770384,
                longitude: 3.18909043634254,
            },
            region: {
                latitude: 36.746946881770384,
                longitude: 3.18909043634254,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034,
            },
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
        };
    }
    componentWillMount() {
        this.props.imagesFetch();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ images: nextProps.images });
    }

    _press = (e) => {
        if (e.coordinate.speed > 0) {
            console.log(189);
            console.log(e.coordinate.latitude);
            //this.props.markerCreate({ latitude: e.coordinate.latitude, longitude: e.coordinate.longitude });
        }
    }
    onPress = (e) => {
        //this.props.markerCreate({ latitude: e.coordinate.latitude, longitude: e.coordinate.longitude });
        console.log(e.coordinate.latitude + ';' + e.coordinate.longitude);
    }
    onViewableItemsChanged = ({viewableItems}) => {
        console.log(viewableItems);
        this.setState({
            marker: 
            {
                latitude: viewableItems[0].item.position.latitude,
                longitude: viewableItems[0].item.position.longitude,
            },
            region: {
                latitude: viewableItems[0].item.position.latitude,
                longitude: viewableItems[0].item.position.longitude,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034,
            },
        });
    }
    render() {
        return (
            <Container>
                <MapView
                    showsUserLocation
                    provider="google"
                    onPress={e => this.onPress(e.nativeEvent)}
                    followsUserLocation
                    onUserLocationChange={event => this._press(event.nativeEvent)}
                    style={{ flex: 1 }}
                    region={this.state.region}
                >
                    <MapView.Marker
                                coordinate={this.state.marker}
                            />

                </MapView>
                <FlatList
                    horizontal
                    pagingEnabled
                  data={this.state.images}
                  renderItem={({item}) => 
                            <Image
                              style={{width: Dimensions.get('window').width, height: '100%'}}
                              resizeMode='contain'
                              source={{uri: item.photo}}
                            />
                        }
                    onViewableItemsChanged={this.onViewableItemsChanged}
                />
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
    const { images } = state.albumState;

    return { images };
};

export default connect(mapStateToProps, { imagesFetch, imageCreate, logOutUser })(Album);
