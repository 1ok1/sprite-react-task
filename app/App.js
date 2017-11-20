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
// import RadioButton from './components/RadioButton';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
  {label: 'COD', value: 0 },
  {label: 'Cash', value: 1 }
];
 

export default class App extends Component {
  
  render() {
    return (
      <ScrollView style={styles.contentContainer} >
        <View style={styles.container}>
          <View style = {styles.logo}>
            <Image source={require('./images/logo-2.png')}/>
          </View>
          <PTTextInput placeHolder="Enter Customer Name" ref="name" />
          <PTTextInput placeHolder="Enter Invoice Number" ref="inv_num" keyboardType="numeric"/>
          <PTTextInput placeHolder="Enter Delivery Address" ref="address"/>
          <MyDatePicker value = {new Date()} ref="date"/>
          <PTTextInput placeHolder="Enter Product ID" ref="product_id" keyboardType="numeric"/>
          <PTTextInput placeHolder="Enter Product Amount" ref="amount" keyboardType="numeric"/>
          <RadioForm style={styles.radioBtn}
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#FF2967'}
            selectedButtonColor={'#FF2967'}
            labelColor={'#FFFFFF'}
            radioStyle= {styles.radioBtn}
            selectedLabelColor={'#FFFFFF'}
            animation={true}
            onPress={(value) => {this.setState({value:value})}}
            ref="radio_group"
          />
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

  _setRadioBtn(selectedButton){
      if (selectedButton === "cod"){
        this.refs.cod.state.isSelected = true
        this.refs.cash.state.isSelected = false
      } else {
        this.refs.cod.state.isSelected = false
        this.refs.cash.state.isSelected = true  
      }
  }

  _placeOrder() {
    var validation = this._validateForm() 
    if (validation) {
      this._showAlert(validation)
    } else {
      let formdata = new FormData();
      formdata.append("customer_name", this.refs.name.state.text)
      formdata.append("invoice_number", this.refs.inv_num.state.text)
      formdata.append("delivery_address", this.refs.address.state.text)
      formdata.append("delivery_date",  this.refs.date.state.date)
      formdata.append("products[id]", this.refs.product_id.state.text)
      formdata.append("products[amount]", this.refs.amount.state.text)
      formdata.append("payment", this.refs.radio_group.state.is_active_index == 0 ? "COD" : "Cash")
      this._fetchApi(formdata)
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

  _fetchApi(formdata){
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
          this._showAlert(response._bodyText)
        } else {
          this._showAlert(response._bodyText)
        }
    }).catch(err => {
        this._showAlert(err)
        console.log(err)
    });
  }
  
  _showAlert(message){
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
  radioBtn : {
    margin : 8
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
