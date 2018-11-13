import React, { Component } from "react";
import { ActivityIndicator } from 'react-native';
import { Content, Container, Header, Title, Text, Body, Separator, ListItem, View, Left, Right, Button, Icon } from "native-base";
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import MapView, { Polyline, ProviderPropType } from 'react-native-maps';
import { decode, encode } from 'rn-maps-polyline';
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
    Mura.init(
      env
    );

    results = Mura.getEntity('map').loadBy('activityId',this.state.activityId)
    .then((results) => {
      console.log(results.getAll());
      console.log(results.get('polyline'));

      this.setState({
        isLoading: false,
        //activityId: activityid,
        summary_polyline: results.get('summary_polyline'),
        mapId: results.get('mapId'),
        polyline: results.get('polyline')
      }, function(){

      });

    }).catch((error) =>{
      console.error(error);
    });

  }

  render() {
    return (
      //console.log(decode(this.state.summary_polyline));
      <View>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        <Polyline
          coordinates={[
            { latitude: 37.8025259, longitude: -122.4351431 },
            { latitude: 37.7896386, longitude: -122.421646 },
            { latitude: 37.7665248, longitude: -122.4161628 },
            { latitude: 37.7734153, longitude: -122.4577787 },
            { latitude: 37.7948605, longitude: -122.4596065 },
            { latitude: 37.8025259, longitude: -122.4351431 }
          ]}
          strokeWidth={5}
        />
        </MapView>
        <Text>{this.state.summary_polyline}</Text>
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
    const { navigation } = this.props;
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
