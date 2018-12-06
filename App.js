import React from 'react';
import { Root, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from "./screens/home/";
import SideBar from "./screens/sideBar/";
import ActivityList from "./screens/activityList";
import ActivityDetails from "./screens/activityDetails";
import styles from "./styles";



export default class App extends React.Component {
  //setting a isReady State so that we can verify that the fonts below completely load before using them

  state={
    isReady: false
  }

  async componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  componentDidMount(){
  }
    render() {
      if (!this.state.isReady) {
        return <Expo.AppLoading />;
      }
      return <RootStack />;
    }

}

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    ActivityList: { screen: ActivityList },
    ActivityDetails: { screen: ActivityDetails },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);


const RootStack = createStackNavigator({
  Drawer: {
    screen: Drawer
  },
  Home: {
    screen: Home,
  },
  ActivityList: {
    screen: ActivityList,
  },
  ActivityDetails: {
    screen: ActivityDetails,
  },

},{
  initialRouteName: "Drawer",
  headerMode: "none"
});
