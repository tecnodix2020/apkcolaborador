import React from 'react';
import { TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CardView from 'react-native-cardview';

import Input from '../components/Input';

export default function FormGuest({ navigation }) {

  const handleSubmit = () => {
    console.log('submeteu formulário');
    navigation.navigate('Chat');
  }

  return (
    <View style={styles.body}>
         <CardView
          style={styles.card}
          cardElevation={6}
          cardMaxElevation={6}
          cornerRadius={9}>
          <View>
            <Input label="Data da Entrega" />
            <Input label="Colaborador Opcional a Receber" />
            <Input label="Telefone" />

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
    marginTop: wp(15),
  },
  button: {
    height: wp(15),
  }
});