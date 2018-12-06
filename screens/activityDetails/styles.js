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
  title: {
    backgroundColor: "#7ccd7c"
  },
  texttitle: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 20,
    marginLeft: 1
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 18,
    marginLeft: 1
  },
  smalltext: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 12,
    marginLeft: 1
  },
};
