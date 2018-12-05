import { StatusBar } from 'react-native';
const React = require("react-native");
const { Platform, Dimensions } = React;

export default {
  container: {
    backgroundColor: "#FFF"
  },
  mb10: {
    marginBottom: 10
  },
  header: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#060"
  },
  content: {
    marginBottom: 10
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 18,
    marginLeft: 10
  },
};
