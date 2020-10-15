import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TextInput, Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import api from '../services/api';

// hook --- nova forma
export default function Home({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const handleEmailChange = (email) => {
      setEmail(email);
    };

    const handlePasswordChange = (password) => {
      console.log(password);
      setPassword(password);
    }; 
    
    const pressHandler = () => {
        
        navigation.navigate('Option');
    }

    const handleSignInPress = async () => {
    if (email.length === 0 || password.length === 0) {
      setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        const response = await api.post('/auth', {
          username: email,
          password: password,
        });

        // validar aqui com if se logou certo antes de passar de tela 
        navigation.navigate('Option')

      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

    return (
      <View style={[styles.body]}>
          <View style={[styles.placeholderLogo]}>
            <Image style={styles.imgLogo} source={require('../img/logo.png')} />
          </View>

          <TextInput
            style={styles.inputMail}
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
          />

          <TextInput
            style={styles.inputPassword}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Senha"
            textContentType="password"
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.buttonSubmit} onPress={pressHandler}>
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
    marginTop: wp(13),
    backgroundColor: 'white',
    width: wp(70),
    borderRadius: wp(1.8),
    fontSize: wp(4.1),
  },
  inputPassword: {
    marginTop: wp(2),
    backgroundColor: 'white',
    width: wp(70),
    borderRadius: wp(1.8),
    fontSize: wp(4.1),
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
    fontSize: wp(4.1),
    color: 'grey',
    fontWeight: 'bold',
  }
});
