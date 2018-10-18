import React, { Component } from "react";
import { ActivityIndicator } from 'react-native';
import { Content, Text, Body, Separator, ListItem, View } from "native-base";
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import styles from "./styles";
import { API_URL, API_SITE_ID } from 'react-native-dotenv'

let convert = require('convert-units');
let moment = require('moment');

const env = {
  siteid:API_SITE_ID,
  rootpath:API_URL
};


export default class ActivityDetails extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,
                  title: "Activity Stats - Home",
                  results: {},
                  name: "",
                  distance: "",
                  polyline: ""
                }
  }

  componentDidMount() {
    //const { navigation } = this.props;
    //const activityid = navigation.getParam('id', 'NO-ID');
  }

  render() {
    return (
      <View>
        <Text>test</Text>

      </View>
    );
  }

}

class Details extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,
                  results: {},
                  name: "",
                  distance: "",
                }
  }

  componentDidMount(){

      //let Mura=require('mura.js');
      let moment = require('moment');
      let convert = require('convert-units');
      //console.log(Mura);

      Mura.init(
        env
      );

      const thisWeekStartDate = moment().startOf('isoWeek').format('YYYY-MM-DD');

      console.log(id);
      results = Mura.getEntity('activity').loadBy('id',this.props.id)
      .then((results) => {
        //console.log(results.getMapsIterator());
        console.log(results.get('map'));
        this.setState({
          isLoading: false,
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

    //console.log(this.state.name);

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 60}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (

      <Content padder>
            <Text>Name: {this.state.name}</Text>
            <Text>Distance: {this.state.distance}</Text>
      </Content>
    );
  }

}
