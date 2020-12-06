import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback, FlatList, SafeAreaView } from 'react-native';

import {Picker} from '@react-native-picker/picker';

import api from '../services/api';

export default class Employee extends Component {
  constructor(props) {
      super(props);
      this.state = {
          data: [],
          selectedEmployee : "-"
      }
  }

  loadEmployees = async() => { 
    try {
      var response = await api.get('/employees')

      console.log(response.data);

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
      this.loadEmployees();
  }

  sendData = (value) => {
      this.props.parentCallback(value);
  }

  employeeList =  () => {
    return( this.state.data.map( (data,i) => { 
        return( <Picker.Item label={data.name} key={i} value={data.name} color="#4c319e" />)} ));
  }

  render() {
    return (
            <Picker
                selectedValue={this.state.selectedEmployee}
                style={styles.pickerStyle}
                onValueChange={ (value) => ( this.setState({selectedEmployee : value}), this.sendData(value))}>
                { this.employeeList() }
            </Picker>
    );
  }
}

const styles = StyleSheet.create({
  pickerStyle: {
    width: '80%',
  },
});
