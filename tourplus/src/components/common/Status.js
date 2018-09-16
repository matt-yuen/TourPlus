import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button } from 'native-base';

export default class Status extends Component {

	render() {
	  switch (this.props.status) {
	    case 1:
	      return (
	      		<Button small style={{ backgroundColor: "green" }}>
                    <Icon active name="checkmark-circle" />
                </Button>
	      	);
	    case 2:
	      return (
	      		<Button style={{ backgroundColor: "orange" }}>
                    <Icon active name="pause" />
                </Button>
	      	);
	    case 3:
	      return (
	      		<Button style={{ backgroundColor: "purple" }}>
                    <Icon type='FontAwesome' active name="spinner" />
                </Button>
	      	);
	   	case 4:
	      return (
	      		<Button style={{ backgroundColor: "red" }}>
                    <Icon type='FontAwesome' active name="ban" />
                </Button>
	      	);
	    default:
	      return (
	      		<Button style={{ backgroundColor: "#FF9501" }}>
                    <Icon active name="checkmark-circle" />
                </Button>
	      	);
		}
	}
}