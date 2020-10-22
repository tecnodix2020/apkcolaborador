import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, TouchableOpacity, TextInput, Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import api from '../services/api';

//onPress={Keyboard.dismiss} - para colocar abraçando toda a view
/*
https://reactnative.dev/docs/keyboardavoidingview

<KeyboardAvoidingView
  behavior={Platform.OS == "ios" ? "padding" : "height"}
  style={styles.container}
>
</KeyboardAvoidingView>
*/

// hook --- nova forma
export default function Home({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const handleEmailChange = (email) => {
      setEmail(email);
    };

    const handlePasswordChange = (password) => {
      //console.log(password);
      setPassword(password);
    }; 
    
    const pressHandlerCreate = () => {
        navigation.navigate('FormUser');
    }
    
    const pressHandlerConfirm = () => {
        navigation.navigate('Option');
    }

    async function saveUser(user) {
      await AsyncStorage.setItem('@ListApp:userToken', JSON.stringify(user))
    }

    const handleSignInPress = async () => {
    if (email.length === 0 || password.length === 0) {
      setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {

        const credentials = {
          email: email,
          password: password
        }  

        const response = await api.post('/auth', credentials);

        const user = response.data;

        console.log(user);

        await saveUser(user);

        // validar aqui com if se logou certo antes de passar de tela 
        navigation.navigate('Option')

      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

    return (

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
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
            <View style={styles.containerButtons}>
              <TouchableOpacity style={styles.buttonCreate} onPress={pressHandlerCreate}>
                <Text style={styles.submitText}>Novo</Text>
              </TouchableOpacity>

              
              <TouchableOpacity style={styles.buttonSubmit} onPress={handleSignInPress}>
                <Text style={styles.submitText}>Entrar</Text>
              </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>
  )
}

//pressHandlerConfirm
//handleSignInPress

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#50C3F3',
    alignItems: 'center',
    //justifyContent: "space-around"
    justifyContent: 'space-between'
  },
  placeholderLogo: {
    //flex: 1,
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width * 0.50,
    height: Dimensions.get('window').width * 0.50,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '5%',
    resizeMode: 'stretch',
  },
  imgLogo: {
    width: wp(35),
    height: hp(20),
    resizeMode: 'stretch',
  },
  inputMail: {
    marginTop: wp(2),
    backgroundColor: 'white',
    width: wp(70),
    borderRadius: wp(1.8),
    fontSize: wp(4.1),
  },
  inputPassword: {
    marginTop: wp(1),
    backgroundColor: 'white',
    width: wp(70),
    borderRadius: wp(1.8),
    fontSize: wp(4.1),
  },
  buttonCreate: {
    backgroundColor: 'yellow',
    width: wp(32),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2.5, 
  },
  buttonSubmit: {
    marginLeft: wp(5),
    backgroundColor: 'lightgreen',
    width: wp(32),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2, 
  },
  submitText: {
    fontSize: wp(4.1),
    color: 'blue',
    fontWeight: 'bold',
  },
  containerButtons: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(5),
  },

});
