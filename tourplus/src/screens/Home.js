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
    static navigationOptions = ({ navigation }) => ({
        header: (
          <Header style={[{ ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        }), backgroundColor: colors.default }]}>
            <Left>
              <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon name='md-menu' style={{ fontSize: 30 }} />
              </Button>
            </Left>
            <Right>
              
            </Right>
          </Header>
        ),
      });
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
                    
                        <Button iconLeft block onPress={() => this.props.navigation.navigate('GuideList')}  style={{backgroundColor: colors.default, marginTop: 20}}>
                          <Text style={{color: '#fdfdfd'}}>Guide</Text>
                        </Button>
                        <Button iconLeft block onPress={() => this.props.navigation.navigate('TouristList')} style={{backgroundColor: colors.default, marginTop: 20}}>
                          <Text style={{color: '#fdfdfd'}}>Tourist</Text>
                        </Button>
                    
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

