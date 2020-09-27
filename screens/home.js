import React from 'react';
import { TouchableOpacity, TextInput, Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Home({ navigation }) {
    
    const pressHandler = () => {
        navigation.navigate('Option');
    }

    return (
      <View style={[styles.body]}>
          <View style={[styles.placeholderLogo]}>
            <Image style={styles.imgLogo} source={require('../img/logo.png')} />
          </View>

          <TextInput
            style={styles.inputMail}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TextInput
            style={styles.inputPassword}
            placeholder="Senha"
            //keyboardType="visible-password"
            textContentType="password"
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={() => {}}
          />

          <TouchableOpacity style={styles.buttonSubmit}>
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>

      </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#50C3F3',
    alignItems: 'center',
  },
  placeholderLogo: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width * 0.50,
    height: Dimensions.get('window').width * 0.50,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: wp(15),
  },
  imgLogo: {
    width: wp(35),
    height: hp(20),
  },
  inputMail: {
    marginTop: wp(15),
    backgroundColor: 'white',
    width: wp(60),
    borderRadius: wp(1.8),
  },
  inputPassword: {
    marginTop: wp(2),
    backgroundColor: 'white',
    width: wp(60),
    borderRadius: wp(1.8),
  },
  buttonSubmit: {
    marginTop: wp(10),
    backgroundColor: 'lightgreen',
    width: wp(35),
    height: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2, 
  },
  submitText: {
    color: 'grey',
    fontWeight: 'bold',
  }
});
