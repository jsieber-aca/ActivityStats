import React, { Component } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Content, Container, Header, Title, Text, Body, Separator, ListItem, View, Left, Right, Button, Icon } from "native-base";
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import MapView, { Polyline, ProviderPropType } from 'react-native-maps';
import RNPolyline  from 'rn-maps-polyline'
import styles from "./styles";
import { API_URL, API_SITE_ID } from 'react-native-dotenv'

let convert = require('convert-units');
let moment = require('moment');

const env = {
  siteid:API_SITE_ID,
  rootpath:API_URL
};
const { width, height } = Dimensions.get('window');

 class ActivityMap extends Component {

   constructor(props){
     super(props);
     this.mapRef = null;
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
      //console.log(results.getAll());

      summary_polyline = RNPolyline.decode(results.get('summary_polyline'));
      console.log(summary_polyline);
      this.setState({
        isLoading: false,
        //activityId: activityid,
        summary_polyline: summary_polyline,
        mapId: results.get('mapId'),
        polyline: results.get('polyline')
      }, function(){

      });

    }).catch((error) =>{
      console.error(error);
    });

    mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]

  }


  render() {
    console.log(this.state.polyline);
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 60}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (

      <View>
        <MapView
          style={stylesMap.map}
          ref={(ref) => { this.mapRef = ref }}
          onLayout = {() => this.mapRef.fitToCoordinates(this.state.summary_polyline, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true })}
          customMapStyle={mapStyle}>
        <Polyline
          coordinates={this.state.summary_polyline}
          strokeWidth={3}
          strokeColor="#F00"
        />
        </MapView>
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

      //console.log(activityid);
      results = Mura.getEntity('activity').loadBy('id',activityid)
      .then((results) => {
        //console.log(results.getMapsIterator());
        //console.log(results.get('map'));
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
         <View style={{ flex: 1 }}>
           <View style={{flex:1}}>
             <ActivityMap activityMapId={this.state.activityId} />
           </View>
           <View style={{flex: 2}}>
             <Text>{this.state.name}</Text>
             <Text>Distance: {this.state.distance} mi.</Text>
           </View>
         </View>
       </Content>
      </Container>
    );
  }

}

const stylesMap = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width,
    height: 300

  },
});

export default Details;
