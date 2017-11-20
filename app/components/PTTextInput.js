import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class PTTextInput extends Component {
    constructor(props) {
      super(props);
      this.state = { text: '' };
    }
  
    render() {
      return (
        <View style={styles.container}>
          <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = {this.props.placeHolder}
                placeholderTextColor = "#F2F3F4"
                autoCapitalize = "none"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}/>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container: { 
      marginLeft: 10,
      marginRight:10,
      marginTop: 8
    },
    input: {
       padding : 10,
       height: 40,
       color : 'white',
       borderColor: '#3E3E3E',
       borderWidth: 1,
    }
  }
);
  