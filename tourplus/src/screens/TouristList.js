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
import Confirm from '../components/common/Confirm';
import { Input } from '../components/common/Input';
import { touristListFetch, joinTeam, logOutUser } from '../actions';
import colors from '../styles/colors';

class TouristList extends React.Component {
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
                    <Title>Tourist</Title>
                </Body>
                <Right>
                    <Button hasText transparent onPress={() => navigation.state.params.changeModal()}>
                      <Text>Join a team</Text>
                    </Button>
                  </Right>
            </Header>
        ),
    });
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            teamName: '',
        };
    }
    componentWillMount() {
        this.props.navigation.setParams({ changeModal: this.changeModal });
        this.props.touristListFetch();
    }

    componentWillReceiveProps(nextProps) {
        //this.setState({ images: nextProps.images });
    }
    changeModal = () => {
        this.setState({ modal: !this.state.modal });
        console.log(7999);
    };
    onAddTeam() {
        //this.props.carDelete(this.state.id, this.props.navigation);
        console.log(this.state.teamName);
        this.props.joinTeam(this.state.teamName);
        this.setState({ modal: false });
      }

    render() {
        console.log(this.props.touristList);
        return (
            <Container>
                <FlatList
                  data={this.props.touristList}
                  renderItem={({item}) => 
                            <ListItem icon button onPress={() => this.props.navigation.navigate('MapTrack', { tripMap: item })}>
                                <Left>
                                    <Button style={{ backgroundColor: "#007AFF" }}>
                                        <Icon active name="images" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>{item.name}</Text>
                                </Body>
                                <Right>
                                    <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                        }
                    keyExtractor={(item, index) => index.toString()}
                />
                <Confirm
                    visible={this.state.modal}
                    onAccept={this.onAddTeam.bind(this)}
                    onDecline={() => this.changeModal()}
                  >
                    <Input 
                        label='Name'
                        onChangeText={(text)=> this.setState({ teamName:text })}
                        ></Input>
                </Confirm>
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
    const { touristList } = state.touristListState;

    return { touristList };
};

export default connect(mapStateToProps, { touristListFetch, joinTeam, logOutUser })(TouristList);
