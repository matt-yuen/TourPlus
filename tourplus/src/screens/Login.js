import React, { Component } from 'react';
import  { Keyboard, Image } from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

// Our custom files and classes import
import colors from '../styles/colors';

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        hasError: false,
        errorText: ''
      };
  }
  
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser(email, password, this.props.navigation);
    Keyboard.dismiss();
  }


  render() {
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
          <View style={{alignItems: 'center', marginBottom: 20, width: '100%'}}>
            <Image
                              style={{ width: 190, height: 190}}
                              resizeMode='contain'
                              source={require('../styles/logo.png')}
                            />
          </View>
          <Item>
              <Icon active name='ios-person' style={{color: "#687373"}}  />
              <Input autoCapitalize='none' placeholder='Username' value={this.props.email} onChangeText={this.onEmailChange.bind(this)} placeholderTextColor="#687373" />
          </Item>
          <Item>
              <Icon active name='ios-lock' style={{color: "#687373"}} />
              <Input autoCapitalize='none' placeholder='Password' value={this.props.password} onChangeText={this.onPasswordChange.bind(this)} secureTextEntry={true} placeholderTextColor="#687373" />
          </Item>
          {this.props.error?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.props.error}</Text>:null}
          <View style={{alignItems: 'center', marginTop: 30}}>
            {this.props.loading ?
                <Spinner color={colors.default} />
            :
                <Button iconLeft onPress={this.onButtonPress.bind(this)} style={{backgroundColor: colors.default, marginTop: 20}}>
                  <Icon name='unlock' />
                  <Text style={{color: '#fdfdfd'}}>Login</Text>
                </Button>
            }
          </View>
        </View>
      </Container>
    );
  }


}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);
