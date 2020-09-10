import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback, FlatList, SafeAreaView } from 'react-native';

export default class Employee extends Component {

  constructor(props) {
      super(props);
      this.state = {
          data: []
      }
  }

  loadUsers = () => {
      fetch("https://backendsecretaria.herokuapp.com/employees")
          .then( res => res.json() )
          .then( res => {
              this.setState ({
                  data: res || []
              });
          })
          .catch((error) => {
              console.error(error);
          });
  }

  componentDidMount() {
      this.loadUsers();
  }

  render() {
    return (
      <View style={[styles.body]}>
          <View style={styles.employeesList}>
            <FlatList
                data={this.state.data}
                renderItem={({item}) => (
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                )}
                keyExtractor={item => item.email}
            />
          </View >
      </View>
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
