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
      <Text>{label}</Text>
      <TextInput style={inputStyle} {...props} />
      <Text style={styles.errorInput}>{touched && error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    minHeight: 10,
    padding: 5,
    backgroundColor: 'white',
    width: wp(90),
    borderRadius: wp(1.8),
    fontSize: wp(4.1),
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