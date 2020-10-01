import React from 'react';
import { TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import Input from '../components/Input';

import { withFormik } from 'formik';
import Yup from 'yup';

const Form = (props) => (
  <View style={styles.body}>
      <View>
        <Input label="Data da Visita" />
        <Input label="Nome do Visitante" />
        <Input label="Colaborador Alternativo" />

        <Button
          onPress={props.handleSubmit}
          title="Salvar"
        />
      </View>

      
  </View>
);

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#50C3F3',
    alignItems: 'center',
  },
});

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),

  handleSubmit: (values) => {
    console.log("values");
  }
})(Form);



