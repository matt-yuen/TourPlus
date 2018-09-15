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

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }



    render() {
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>

                  
                  <View style={{alignItems: 'center', marginTop: 30}}>
                    
                        <Text>Welcome</Text>
                    
                  </View>
                </View>
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

