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
        return( <Picker.Item label={data.name} key={i} value={data.id}  />)} )); // the data.id or data.name will determine what is given to post on parent
  }

  render() {
    return (
            <Picker
                selectedValue={this.state.selectedGuest}
                style={{ height: 50, width: 270 }}
                onValueChange={ (value) => ( this.setState({selectedGuest : value}),  this.sendData(value))}>
                { this.guestList() }
            </Picker>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#50C3F3',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  employeesList: {
    width: 220,
    height: 350,
    position: 'absolute',
    left: '30%',
    top: '25%',
    backgroundColor: '#FFF',
    borderRadius: 15,
  },
  name: {
    paddingLeft: 10,
    paddingTop: 15,
    fontSize: 20,
  },
});
