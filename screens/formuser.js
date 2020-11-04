import React, { useState, setState } from 'react';
import { TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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

  const handleSubmit = () => {
    console.log('submeteu formulário' + ' - ' + username + ' - ' + email + ' - ' + password);
    //navigation.navigate('Chat');
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
              onPress={handleSubmit}
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


