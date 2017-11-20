import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date: this.props.value}
  }

  render(){
    return (
      <DatePicker
        style={styles.container}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateText: {
            color : "white"
          },
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            backgroundColor : 'transparent',
            borderColor : 'transparent',
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}

const styles = StyleSheet.create({
    container: { 
      marginLeft: 10,
      marginRight:10,
      marginTop: 8,      
    }
  }
);