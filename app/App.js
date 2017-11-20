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
          <PTTextInput placeHolder="Enter Customer Name" ref="name"/>
          <PTTextInput placeHolder="Enter Invoice Number" ref="inv_num"/>
          <PTTextInput placeHolder="Enter Delivery Address" ref="address"/>
          <MyDatePicker value = {new Date()}/>
          <PTTextInput placeHolder="Enter Product ID" ref="product_id"/>
          <PTTextInput placeHolder="Enter Product Amount" ref="amount"/>
          <View style={styles.horizontal}>
            <RadioButton text="COD" isSelected = {true}/>
            <RadioButton text="Cash Payment" isSelected = {false}/>
          </View>
          <TouchableHighlight
            style={styles.addProductBtn}
            onPress={() => this._placeOrder()}>
              <Text style={styles.addProduct}>
                ADD PRODUCT
              </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }

  _placeOrder() {
    var validation = this._validateForm() 
    if (validation === "") {
      let formdata = new FormData();
      formdata.append("customer_name", this.refs.name.state.text)
      formdata.append("invoice_number", this.refs.inv_num.state.text)
      formdata.append("delivery_address", this.refs.address.state.text)
      formdata.append("delivery_date", '20/08/2017')
      formdata.append("products[id]", this.refs.product_id.state.text)
      formdata.append("products[amount]", this.refs.amount.state.text)
      formdata.append("payment", "COD")
      this.fetchApi(formdata)
    } else {
      this.showAlert(validation)
    }
  }


  _validateForm(){
    if (this.refs.name.state.text === "") {
      return "Please enter user name"
    } else if (this.refs.inv_num.state.text === "") {
      return "Please enter Invoice number"
    } else if (this.refs.address.state.text === "") {
      return "Please enter address"
    } else if (this.refs.product_id.state.text === "") {
      return "Please enter product Id"
    } else if (this.refs.amount.state.text === "") {
      return "Please enter amount"
    }
  }

  fetchApi(formdata){
    fetch('https://api-coding-spritle.herokuapp.com/api/orders/add',{
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
    })
    .then(response => {    
        console.log(response)
        if (response.status == 200) {
          this.showAlert(response._bodyText)
        } else {
          this.showAlert(response._bodyText)
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
