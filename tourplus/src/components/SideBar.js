import React from "react";
import firebase from 'firebase';
import { AppRegistry, Image, StatusBar, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { Container, Content, Text, List, ListItem, Header, Body, Thumbnail, Left, Button, Icon, Right, Subtitle, Title } from "native-base";
import { logOutUser } from '../actions';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Mr',
            photo: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg'
        };
    }
    componentWillMount() {
        console.log('mounted');
        const { currentUser } = firebase.auth();
          const uid = currentUser.uid;
          //console.log(uid);
          firebase.database().ref(`/users/${uid}`)
            .once('value', snapshot => {
              var touristNotifToken = snapshot.val().notifToken;
              //console.log(snapshot.val());
              if (snapshot.val().photo)
                this.setState({name: snapshot.val().name, photo: snapshot.val().photo });

            });
    }
    render() {
        return (
            <Container>
                <Header style={{ height: 200 }}>
                    <Left></Left>
                    <Body>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera', { page: 'profile' })}>
                        <Thumbnail  large
                            source={{
                                uri: this.state.photo
                            }}
                        />
                        </TouchableOpacity>
                        <Title>{this.state.name}</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <ListItem icon button onPress={() => this.props.navigation.navigate('Album')}>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="images" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Pictures</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    
                    <ListItem icon button onPress={() => this.props.navigation.navigate('Camera', { page: 'album' })}>
                        <Left>
                            <Button style={{ backgroundColor: "green" }}>
                                <Icon active name="ios-camera" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Camera</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon button onPress={() => this.props.logOutUser(this.props.navigation)}>
                        <Left>
                            <Button style={{ backgroundColor: "red" }}>
                                <Icon active name="ios-log-out" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Logout</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

export default connect(null, { logOutUser })(SideBar);