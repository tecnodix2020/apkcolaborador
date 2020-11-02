import React, {setState, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Animated, ToastAndroid, Keyboard, KeyboardAvoidingView, TouchableOpacity, TextInput, Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
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

let widthLogo =  Dimensions.get('window').width * 0.50;
let heightLogo = Dimensions.get('window').width * 0.50;

export default function Home({ navigation }) {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // or some other action
          keyboardDidShow();
          console.log("teclado up");
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false); // or some other action
          keyboardDidHide();
          console.log("teclado down");
        }
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

    let _animatedValue = new Animated.Value(0);

    const keyboardDidShow  = () => {
      /*Animated.parallel([
        Animated.timing(widthLogo, {​​​​​
          toValue: Dimensions.get('window').width * 0.25,
          duration: 200,
        }​​​​​),
        Animated.timing(heightLogo, {​​​​​
          toValue: Dimensions.get('window').width * 0.25,
          duration: 200,
       }​​​​​),
      ]).start();
      Animated.timing(_animatedValue, {
        toValue: 100,
        useNativeDriver: true
      }).start();*/
    };

    const keyboardDidHide = () => {
      //console.log(_animatedValue);
    };

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (username) => {
      setUserName(username);
    };

    const handlePasswordChange = (password) => {
      setPassword(password);
    }; 
    
    const pressHandlerCreate = () => {
        navigation.navigate('FormUser');
    }
    
    // Storing value
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
      } catch (e) {
        console.log(e);
      }
    }

    // Reading stored value
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        console.log(e);
      }
    }

    const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        10,
        20
      );
    };

    const handleSignInPress = async () => {
    if (username.length === 0 || password.length === 0) {
      //this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => {
        //console.log(error);
      //});
      showToastWithGravityAndOffset("Preencha Login e Senha!");
    } else {
      try {

        const credentials = {
          username: username,
          password: password
        }  

        const response = await api.post('/auth', credentials);

        const user = response.data;

        await AsyncStorage.setItem('@App_user', JSON.stringify(user)) // save itens to local storger

        const currentUser = await AsyncStorage.getItem('@App_user') // get data from storage passing key

        navigation.navigate('Option', currentUser)

      } catch (_err) {
        //this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
        showToastWithGravityAndOffset("Dados Inválidos Para Login!")
      }
    }
  };

    return (

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={[styles.body]}>

            <View style={styles.containerImage}>
              <View style={[styles.placeholderLogo]}>
                <Image style={styles.imgLogo} source={require('../img/logo.png')} />
              </View>
            </View>

            <View style={styles.containerImputs}>

              <TextInput
                style={styles.inputUsername}
                value={username}
                onChangeText={handleUsernameChange}
                placeholder="Login"
                autoCapitalize="none"
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
                  <Text style={styles.submitText}>Criar Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSubmit} onPress={handleSignInPress}>
                  <Text style={styles.submitText}>Entrar</Text>
                </TouchableOpacity>
              </View>

            </View>

            
        </View>
      </KeyboardAvoidingView>
  )
}

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
    justifyContent: 'space-between'
  },
  containerImage: {
    flex: 1,
  },
  placeholderLogo: {
    backgroundColor: '#FFFFFF',
    width: widthLogo,
    height: heightLogo,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '7%',
    resizeMode: 'stretch',
  },
  imgLogo: {
    width: wp(35),
    height: hp(20),
    resizeMode: 'stretch',
  },
  containerImputs: {
    flex: 1,
    //marginTop: wp(10),
  },
  inputUsername: {
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
    marginBottom: wp(1.5),
  },
  buttonCreate: {
    backgroundColor: '#925590',
    width: wp(32),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2.5, 
  },
  buttonSubmit: {
    marginLeft: wp(5),
    backgroundColor: '#1c8cb7',
    width: wp(32),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2, 
  },
  submitText: {
    fontSize: wp(4.1),
    color: '#eeefe5',
    fontWeight: 'bold',
  },
  containerButtons: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});
