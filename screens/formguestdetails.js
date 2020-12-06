import React, { useState, setState } from 'react';
import { TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CardView from 'react-native-cardview';

import { Divider } from 'react-native-paper';

import Input from '../components/Input';

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

  const handleSubmit = () => {
    console.log('submeteu formulário' + ' - ' + name + ' - ' + cpf + ' - ' + company);
    navigation.navigate('FormGuest', name);
  }

  const clearFields = () => {
    setUserName('');
    setEmail('');
    setPassword('');
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