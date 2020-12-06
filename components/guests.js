import React, { Component, useState, setState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback, FlatList, SafeAreaView } from 'react-native';

import {Picker} from '@react-native-picker/picker';

import api from '../services/api';

export default class Guests extends Component {

  constructor(props) {
      super(props);
      this.state = {
          data: [],
          selectedGuest : "-"
      }
  }
  
  loadGuests = async() => { 
    try {
      var response = await api.get('/visitors')

      this.setState ({
                  data: response.data.map(item => {
                    return { id: item.id, name: item.name}
                  }) || []
              });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
      this.loadGuests();
  }

  sendData = (value) => {
      this.props.parentCallback(value);
  }

  guestList =  () => {
    return( this.state.data.map( (data,i) => { 
        return( <Picker.Item label={data.name} key={i} value={data.name} color="#4c319e" />)} )); 
  }

  render() {
    return (
            <Picker
                selectedValue={this.state.selectedGuest}
                style={styles.pickerStyle}
                onValueChange={ (value) => ( this.setState({selectedGuest : value}),  this.sendData(value))}>
                { this.guestList() }
            </Picker>
    );
  }
}

const styles = StyleSheet.create({
  pickerStyle: {
    width: '80%',
  },
});
