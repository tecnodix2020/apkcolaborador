import React, { useState, setState } from 'react';
import { ToastAndroid, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import CardView from 'react-native-cardview';

import { Divider } from 'react-native-paper';

import Input from '../components/Input';

import api from '../services/api';

export default function FormGuestDetails({ route, navigation }) {

  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [company, setCompany] = useState('');

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleCpfChange = (cpf) => {
    setCPF(cpf);
  }; 

  const handleCompanyChange = (company) => {
    setCompany(company);
  };

  const handleSubmit = async() => {
    try {

        const data = {
          personalCode: cpf,
          idCompany: 'f556895f-efa3-4428-b6a5-f90dd7e3a94e',
          name: name,
          email: 'padrao2@landix.com.br',
          observation: company
        }  

        const response = await api.post('/visitors', data);

        const user = response.data;

        console.log(user);

        const message = await showToastWithGravityAndOffset("Cadastro Efetuado Com Sucesso!");

        navigation.navigate('FormGuest', name);
      
      } catch (_err) {
        console.log(_err);
      }
  };

  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      20,
      30
    );
  };

  return (
    <View style={styles.body}>
         <CardView
          style={styles.card}
          cardElevation={6}
          cardMaxElevation={6}
          cornerRadius={9}>
          <View>
            <Input 
              label="NOME"
              value={name}
              textContentType="name"
              onChangeText={handleNameChange}
            />

            <Divider />

            <Input 
              label="CPF"
              value={cpf}
              keyboardType="numeric"
              onChangeText={handleCpfChange}
            />

            <Divider />

            <Input 
              label="EMPRESA"
              value={company}
              textContentType="name"
              onChangeText={handleCompanyChange}
            />

            <Divider />
          </View>

          <TouchableOpacity style={styles.submitContainer} onPress={handleSubmit}>
            <Text style={styles.submit}> SALVAR </Text>
          </TouchableOpacity>

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
    marginTop: wp(15),
    alignItems: 'center',
  },
  button: {
    height: wp(15),
  },
  submitContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: wp(3),
    marginBottom: wp(3),
    width: '60%',
    alignSelf: "center",
  },
  submit: {
    fontSize: wp(5.5),
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});