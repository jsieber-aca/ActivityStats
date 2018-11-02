import React, { Component } from "react";
import { ActivityIndicator } from 'react-native';
import { Content, Container, Header, Title, Text, Body, Separator, ListItem, View, Left, Right, Button, Icon } from "native-base";
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import styles from "./styles";
import { API_URL, API_SITE_ID } from 'react-native-dotenv'

let convert = require('convert-units');
let moment = require('moment');

const env = {
  siteid:API_SITE_ID,
  rootpath:API_URL
};


 class ActivityMap extends Component {

   constructor(props){
     super(props);
     this.state ={ isLoading: true,
                   activityId: this.props.activityMapId,
                 }
   }

  componentDidMount() {
    //const { navigation } = this.props;
    //const activityid = navigation.getParam('id', 'NO-ID');
    activityId = this.state.activityId;
    console.log(activityId);
  }

  render() {
    return (
      <View>
        <Text>{this.state.activityId}</Text>
      </View>
    );
  }

}

export default class Details extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,
                  results: {},
                  name: "",
                  distance: "",
                }
  }

  componentDidMount(){
      const { navigation } = this.props;
      const activityid = navigation.getParam('id', 'NO-ID');
      //let Mura=require('mura.js');
      let moment = require('moment');
      let convert = require('convert-units');
      //console.log(Mura);

      Mura.init(
        env
      );

      const thisWeekStartDate = moment().startOf('isoWeek').format('YYYY-MM-DD');

      console.log(activityid);
      results = Mura.getEntity('activity').loadBy('id',activityid)
      .then((results) => {
        //console.log(results.getMapsIterator());
        console.log(results.get('map'));
        this.setState({
          isLoading: false,
          activityId: activityid,
          name: results.get('name'),
          distance: convert(results.get('distance')).from('m').to('mi').toFixed(2),
          mapId: results.get('map'),
        }, function(){

        });

      }).catch((error) =>{
        console.error(error);
      });
      };

  render() {

    //console.log(this.state.abc);

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 60}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.name}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
              <ActivityMap activityMapId={this.state.activityId} />
              <Text>Name: {this.state.name}</Text>
              <Text>Distance: {this.state.distance}</Text>
        </Content>
      </Container>
    );
  }

}
