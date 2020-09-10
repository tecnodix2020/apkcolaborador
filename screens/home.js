import React from 'react';
import { Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';

export default function Home({ navigation }) {
    
    const pressHandler = () => {
        navigation.navigate('Option');
    }

    return (
      <View style={[styles.body]}>
          <View style={[styles.placeholderLogo]}>
            <Image style={styles.imgLogo} source={require('../img/logo.png')} />
          </View>
      </View>
  )
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
  placeholderLogo: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '20%',
    marginBottom: '80%',
  },
  imgLogo: {
    width: 150,
    height: 130,
    margin: 10,
  },
});
