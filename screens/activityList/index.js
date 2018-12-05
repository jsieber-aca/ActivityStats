import React, { Component } from "react";
import { ActivityIndicator } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Badge, Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem } from 'native-base';
import styles from "./styles";
import { API_REST_URL } from 'react-native-dotenv'

var convert = require('convert-units');

  class ActivityList extends React.Component {

    constructor(props){
      super(props);
      this.state ={ isLoading: true}

    }

    componentDidMount(){
      return fetch(API_REST_URL)
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson.data.items);
          this.setState({
            isLoading: false,
            dataSource: responseJson.data.items,
          }, function(){

          });

        })
        .catch((error) =>{
          console.error(error);
        });
    }



    render(){

      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 60}}>
            <ActivityIndicator/>
          </View>
        )
      }

      return(
        <Container style={styles.container}>
          <Header style={styles.header}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>Activities</Title>
            </Body>
            <Right />
          </Header>
          <Content padder style={styles.content}>
            <List
              dataArray={this.state.dataSource}
              renderRow={(item) => <ListItem button onPress={() => { this.props.navigation.navigate('ActivityDetails', { id: item.id }); }}>{item.type == "Ride" ? (<Icon name="bicycle" style={{ color: '#0A69FE', fontSize: 25}} />) : (<Icon type="MaterialIcons" name="directions-run" style={{ color: '#0A69FE', fontSize: 25}} />)}<Body><Text style={styles.text}>{item.name}</Text></Body><Right><Badge style={styles.badge}><Text>{convert(item.distance).from('m').to('mi').toFixed(2)} mi.</Text></Badge></Right></ListItem>}
              keyExtractor={(item, index) => index}
            >
          </List>
          </Content>
        </Container>
      );
    }
  }

export default ActivityList;
