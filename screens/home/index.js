import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, Separator, ListItem, Tabs, Tab } from 'native-base';
//import crypto from 'react-native-fast-crypto';
import Mura from "mura.js";
import styles from "./styles";
import TabRun from "./tabRun";
import TabRide from "./tabRide";


class Home extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,
                  title: "Activity Stats - Home",
                  data: {}
                }
  }




  render(){
    return(

      <Container style={styles.container}>
        <Header style={styles.header} hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Tabs>
          <Tab heading="Run">
            <TabRun />
          </Tab>
          <Tab heading="Ride">
            <TabRide />
          </Tab>
        </Tabs>

        </Content>
      </Container>
    );

  }

}

export default Home;
