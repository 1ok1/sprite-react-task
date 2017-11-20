import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text
} from 'react-native';
import RadioView from './RadioView';

export default class PTTextInput extends Component {
    constructor(props) {
      super(props);
      this.state = { text: '' };
    }
  
    render() {
      return (
        <View style={styles.container}>
          <RadioView 
            animation={'bounceIn'}
            isSelected={this.props.isSelected}/>
          <Text style = {styles.input} > {this.props.text}</Text>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container: { 
      marginLeft: 10,
      marginRight:10,
      marginTop: 8,
      flex: 1, 
      flexDirection: 'row'
    },
    input: {
       padding : 10,
       height: 40,
       color : 'white',
    }
  }
);
  