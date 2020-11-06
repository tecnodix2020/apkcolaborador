import React, { useState, setState } from 'react';
import { ToastAndroid, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import api from '../services/api';

import CardView from 'react-native-cardview';

import Input from '../components/Input';

export default function FormGuest({ navigation }) {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (username) => {
    setUserName(username);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  }; 

  const handlePasswordChange = (password) => {
    setPassword(password);
  }; 

  const clearFields = () => {
    setUserName('');
    setEmail('');
    setPassword('');
  }

  const handleSubmit = () => {
    console.log('submeteu formulário' + ' - ' + username + ' - ' + email + ' - ' + password);
    //navigation.navigate('Chat');
  }

  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      20,
      30
    );
  };

  const handleCreateUserPress = async () => {
    if (username.length === 0 || password.length === 0) {
      //this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => {
        //console.log(error);
      //});
      //showToastWithGravityAndOffset("Preencha Login e Senha!");
      showToastWithGravityAndOffset("Verifique os dados para envio!");
    } else {
      try {

        const data = {
          name: username,
          username: email,
          password: password
        }  

        const response = await api.post('/users', data);

        const user = response.data;

        const message = await showToastWithGravityAndOffset("Cadastro Efetuado Com Sucesso!");

        clearFields();
        navigation.navigate('Home');
        

      } catch (_err) {
        //showToastWithGravityAndOffset("Dados Inválidos Para Login!")
        showToastWithGravityAndOffset("Houve um erro na conexão!");
        console.log(_err);
      }
    }
  }

  return (
    <View style={styles.body}>
         <CardView
          style={styles.card}
          cardElevation={6}
          cardMaxElevation={6}
          cornerRadius={9}>
          <View>
            <Input 
              label="Nome"
              value={username}
              textContentType="name"
              onChangeText={handleUsernameChange}
            />
            <Input 
              label="Email"
              value={email}
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={handleEmailChange}
            />
            <Input 
              label="Senha"
              value={password}
              textContentType="password"
              autoCapitalize="none"
              autoCompleteType="password"
              onChangeText={handlePasswordChange}
              autoCorrect={false}
              secureTextEntry={true}
            />

            <Button
              style={styles.button}
              onPress={handleCreateUserPress}
              title="Salvar"
            />
          </View>
        </CardView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#50C3F3',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginTop: wp(5),
  },
  button: {
    height: wp(15),
  }
});


