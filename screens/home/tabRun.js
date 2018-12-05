import React, { Component } from "react";
import { ActivityIndicator } from 'react-native';
import { Content, Text, Body, Separator, ListItem, View } from "native-base";
import styles from "./styles";
import { API_URL, API_SITE_ID } from 'react-native-dotenv'

let convert = require('convert-units');
let moment = require('moment');

console.log(API_URL);

const env = {
  siteid:API_SITE_ID,
  rootpath:API_URL
};

export default class TabRun extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,
                  title: "Activity Stats - Home",
                  data: {}
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
      const thisMonthStartDate = moment().format('YYYY-MM-01');
      const thisYearStartDate = moment().format('YYYY-01-01');
      const lastWeekStartDate = moment().startOf('isoWeek').subtract(1, 'week').format('YYYY-MM-DD');
      let data = {};
      console.log(thisMonthStartDate);
      console.log("before current year query");
      Mura.getFeed('activity')
        .where() //optional
        .prop('start_date_local')
        .isGT(thisYearStartDate)
        .andProp('type')
        .isEQ('run')
        .aggregate('count', '*')
        .aggregate('sum', 'distance')
        .aggregate('min', 'distance')
        .aggregate('max', 'distance')
        .aggregate('avg', 'distance')
        .getQuery()
        .then(function(activitysum){
            console.log("after currentmonth query");
            //setup values
            data.yearDistance = convert(activitysum.item(0).get('sum_distance')).from('m').to('mi').toFixed(2);
            data.yearAverageDistance = convert(activitysum.item(0).get('avg_distance')).from('m').to('mi').toFixed(2);
            data.yearMinimumDistance = convert(activitysum.item(0).get('min_distance')).from('m').to('mi').toFixed(2);
            data.yearMaximumDistance = convert(activitysum.item(0).get('max_distance')).from('m').to('mi').toFixed(2);
            //console.log(data);
            return data;
          }).then((results) => {
            //console.log(results);
            this.setState({
              isLoading: false,
              thisYearDistance: results.yearDistance,
              thisYearAverageDistance: results.yearAverageDistance,
              thisYearMinimumDistance: results.yearMinimumDistance,
              thisYearMaximumDistance: results.yearMaximumDistance,
            }, function(){

            });
          }).catch((error) =>{
            console.error(error);
          });

      console.log("before current month query");
      Mura.getFeed('activity')
        .where() //optional
        .prop('start_date_local')
        .isGT(thisMonthStartDate)
        .andProp('type')
        .isEQ('run')
        .aggregate('count', '*')
        .aggregate('sum', 'distance')
        .aggregate('min', 'distance')
        .aggregate('max', 'distance')
        .aggregate('avg', 'distance')
        .getQuery()
        .then(function(activitysum){
            console.log("after currentmonth query");
            //setup values
            data.monthDistance = convert(activitysum.item(0).get('sum_distance')).from('m').to('mi').toFixed(2);
            data.monthAverageDistance = convert(activitysum.item(0).get('avg_distance')).from('m').to('mi').toFixed(2);
            data.monthMinimumDistance = convert(activitysum.item(0).get('min_distance')).from('m').to('mi').toFixed(2);
            data.monthMaximumDistance = convert(activitysum.item(0).get('max_distance')).from('m').to('mi').toFixed(2);
            //console.log(data);
            return data;
          }).then((results) => {
            //console.log(results);
            this.setState({
              isLoading: false,
              thisMonthDistance: results.monthDistance,
              thisMonthAverageDistance: results.monthAverageDistance,
              thisMonthMinimumDistance: results.monthMinimumDistance,
              thisMonthMaximumDistance: results.monthMaximumDistance,
            }, function(){

            });
          }).catch((error) =>{
            console.error(error);
          });

      console.log("before current week query");
      Mura.getFeed('activity')
        .where() //optional
        .prop('start_date_local')
        .isGT(thisWeekStartDate)
        .andProp('type')
        .isEQ('run')
        .aggregate('count', '*')
        .aggregate('sum', 'distance')
        .aggregate('min', 'distance')
        .aggregate('max', 'distance')
        .aggregate('avg', 'distance')
        .getQuery()
        .then(function(activitysum){
            console.log("after current week query");
            //setup values
            data.weekDistance = convert(activitysum.item(0).get('sum_distance')).from('m').to('mi').toFixed(2);
            data.weekAverageDistance = convert(activitysum.item(0).get('avg_distance')).from('m').to('mi').toFixed(2);
            data.weekMinimumDistance = convert(activitysum.item(0).get('min_distance')).from('m').to('mi').toFixed(2);
            data.weekMaximumDistance = convert(activitysum.item(0).get('max_distance')).from('m').to('mi').toFixed(2);
            //console.log(data);
            return data;
          }).then((results) => {
            //console.log(results);
            this.setState({
              isLoading: false,
              thisWeekDistance: results.weekDistance,
              thisWeekAverageDistance: results.weekAverageDistance,
              thisWeekMinimumDistance: results.weekMinimumDistance,
              thisWeekMaximumDistance: results.weekMaximumDistance,
              lastWeekDistance: results.lastWeekDistance,
              lastWeekAverageDistance: results.lastWeekAverageDistance,
              lastWeekMinimumDistance: results.lastWeekMinimumDistance,
              lastWeekMaximumDistance: results.lastWeekMaximumDistance,
            }, function(){

            });
          }).catch((error) =>{
            console.error(error);
          });

          console.log("before last week query");
          Mura.getFeed('activity')
            .where() //optional
            .prop('start_date_local')
            .isGT(lastWeekStartDate)
            .andProp('start_date_local')
            .isLT(thisWeekStartDate)
            .andProp('type')
            .isEQ('run')
            .aggregate('count', '*')
            .aggregate('sum', 'distance')
            .aggregate('min', 'distance')
            .aggregate('max', 'distance')
            .aggregate('avg', 'distance')
            .getQuery()
            .then(function(activitysum){
                console.log("after last week query");
                //setup values
                data.lastWeekDistance = convert(activitysum.item(0).get('sum_distance')).from('m').to('mi').toFixed(2);
                data.lastWeekAverageDistance = convert(activitysum.item(0).get('avg_distance')).from('m').to('mi').toFixed(2);
                data.lastWeekMinimumDistance = convert(activitysum.item(0).get('min_distance')).from('m').to('mi').toFixed(2);
                data.lastWeekMaximumDistance = convert(activitysum.item(0).get('max_distance')).from('m').to('mi').toFixed(2);
                //console.log("query2" + data);
                return data;
            }).then((results) => {
              console.log(results);
              this.setState({
                isLoading: false,
                lastWeekDistance: results.lastWeekDistance,
                lastWeekAverageDistance: results.lastWeekAverageDistance,
                lastWeekMinimumDistance: results.lastWeekMinimumDistance,
                lastWeekMaximumDistance: results.lastWeekMaximumDistance,
              }, function(){

              });

            }).catch((error) =>{
              console.error(error);
            });
    }


  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 60}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <Content padder>
        <Separator bordered>
          <Text style={styles.biggreen}>RUN - THIS WEEK</Text>
        </Separator>
        <ListItem >
          <Text>Distance: {this.state.thisWeekDistance}</Text>
        </ListItem>
        <ListItem>
          <Text>Average Distance: {this.state.thisWeekAverageDistance}</Text>
        </ListItem>
        <ListItem>
          <Text>Minimum Distance: {this.state.thisWeekMinimumDistance}</Text>
        </ListItem>
        <ListItem last>
          <Text>Maximum Distance: {this.state.thisWeekMaximumDistance}</Text>
        </ListItem>
        <Separator bordered>
          <Text style={styles.biggreen}>RUN - LAST WEEK</Text>
        </Separator>
        <ListItem>
          <Text>Distance: {this.state.lastWeekDistance}</Text>
        </ListItem>
        <ListItem>
          <Text>Average Distance: {this.state.lastWeekAverageDistance}</Text>
        </ListItem>
        <ListItem>
          <Text>Minimum Distance: {this.state.lastWeekMinimumDistance}</Text>
        </ListItem>
        <ListItem last>
          <Text>Maximum Distance: {this.state.lastWeekMaximumDistance}</Text>
        </ListItem>
        <Separator bordered>
          <Text style={styles.biggreen}>RUN - THIS MONTH</Text>
        </Separator>
        <ListItem>
          <Text>Distance: {this.state.thisMonthDistance}</Text>
        </ListItem>
        <ListItem>
          <Text>Average Distance: {this.state.thisMonthAverageDistance}</Text>
        </ListItem>
        <ListItem>
          <Text>Minimum Distance: {this.state.thisMonthMinimumDistance}</Text>
        </ListItem>
        <ListItem last>
          <Text>Maximum Distance: {this.state.thisMonthMaximumDistance}</Text>
        </ListItem>
        <Separator bordered>
          <Text style={styles.biggreen}>RUN - THIS YEAR</Text>
        </Separator>
        <ListItem>
          <Text>Distance: {this.state.thisYearDistance}</Text>
        </ListItem>
        <ListItem>
          <Text>Average Distance: {this.state.thisYearAverageDistance}</Text>
        </ListItem>
        <ListItem>
          <Text>Minimum Distance: {this.state.thisYearMinimumDistance}</Text>
        </ListItem>
        <ListItem last>
          <Text>Maximum Distance: {this.state.thisYearMaximumDistance}</Text>
        </ListItem>
      </Content>
    );
  }
}
