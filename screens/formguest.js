import React from 'react';
import { TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { withFormik } from 'formik';
import Yup from 'yup';

const Form = (props) => (
  <View>
    <TextInput
      value={props.values.email}
      onChangeText={text => props.setFieldValue('email', text)}
    />

    <TextInput
      value={props.values.password}
      onChangeText={text => props.setFieldValue('password', text)}
    />

    <Button
      onPress={props.handleSubmit}
      title="Salvar"
    />
  </View>
);

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),

  handleSubmit: (values) => {
    console.log(values);
  }
})(Form);

