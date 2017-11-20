/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  View,
  Image,
  Alert
} from 'react-native';
import PTTextInput from './components/PTTextInput'; 
import MyDatePicker from './components/MyDatePicker';
import RadioButton from './components/RadioButton';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.contentContainer} >
        <View style={styles.container}>
          <View style = {styles.logo}>
            <Image source={require('./images/logo-2.png')}/>
          </View>
          <PTTextInput placeHolder="Enter Customer Name"/>
          <PTTextInput placeHolder="Enter Invoice Number"/>
          <PTTextInput placeHolder="Enter Delivery Address"/>
          <MyDatePicker value = {new Date()}/>
          <PTTextInput placeHolder="Enter Product ID"/>
          <PTTextInput placeHolder="Enter Product Amount"/>
          <PTTextInput placeHolder="Select Payment Type"/>
          <View style={styles.horizontal}>
            <RadioButton text="COD" isSelected = {true}/>
            <RadioButton text="Cash Payment" isSelected = {false}/>
          </View>
          <TouchableHighlight
            style={styles.addProductBtn}
            onPress={() => this.addProduct()}>
              <Text style={styles.addProduct}>
                ADD PRODUCT
              </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }

  addProduct() {
    let formdata = new FormData();
    formdata.append("customer_name", 'vignesh')
    formdata.append("invoice_number", 10)
    formdata.append("delivery_address", "Mugalivakkam")
    formdata.append("delivery_date", '20/08/2017')
    formdata.append("products[id]", 1)
    formdata.append("products[amount]", 2000)
    formdata.append("payment", "COD")
    
    
    fetch('https://api-coding-spritle.herokuapp.com/api/orders/add',{
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
    }).then(response => {    
        console.log(response)
        if (response.status == 200) {
          this.showAlert(response.json)
        } else {
          this.showAlert(response)
        }
    }).catch(err => {
        this.showAlert(err)
        console.log(err)
    });  
  }
  
  showAlert(message){
    Alert.alert(
      'Alert',
      message,
      [{text: 'OK', onPress: () => console.log('OK')},],
      { cancelable: false }
    )
  }

}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    backgroundColor : '#212121',
  },
  logo : {
    alignItems: 'center',
    justifyContent: 'center',  
    justifyContent: 'center',
    alignItems: 'center',  
    marginBottom : 20
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop:56,
    backgroundColor : '#212121',
  },
  addProductBtn:{
    margin:10,
    marginTop : 20,
    paddingTop:10,
    paddingRight: 10,
    paddingLeft : 10,
    paddingBottom:10,
    backgroundColor:'#FF2967',
    borderRadius:4,
    borderWidth: 1,   
    borderColor: '#3E3E3E'
  },
  addProduct: {
    fontSize: 14,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
  },
  horizontal :{
    flex: 1, 
    flexDirection: 'row'
  }
});
