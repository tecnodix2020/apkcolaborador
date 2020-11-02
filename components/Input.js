import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Input = ({
  label,
  inputStyle,
  containerStyle,
  touched,
  error,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.textInput}>{label}</Text>
      <TextInput style={styles.input} {...props} />
      <Text style={styles.errorInput}>{touched && error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 5,
  },
  textInput: {
    fontSize: wp(5.1),
    color: '#042302',
    margin: wp(2),
  },
  input: {
    borderBottomWidth: 0.5,
    minHeight: wp(10),
    padding: 5,
    margin: wp(1),
    backgroundColor: '#d4dad4',
    width: wp(85),
    height: wp(10),
    borderRadius: wp(1.8),
    fontSize: wp(5.1),
  },
  errorInput: { color: "red", fontSize: 12 },
});

const stylePropsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.object,
]);

Input.propTypes = {
  inputStyle: stylePropsType,
  containerStyle: stylePropsType,
  ...TextInput.propTypes, 
};
Input.defaultProps = {
  inputStyle: styles.input,
  containerStyle: styles.containerStyle,
  touched: false,
  error: null,
};

export default Input;