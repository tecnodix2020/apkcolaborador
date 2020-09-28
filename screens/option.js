import React from 'react';
import { TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Option({ navigation }) {

    const pressHandler1 = () => {
        navigation.navigate('FormGuest');
    }

    const pressHandler2 = () => {
        navigation.navigate('FormDelivery');
    }

    return (
        <View>
          <View style={styles.body}>
            <FAB
                style={styles.fab}
                small
                icon="add"
                onPress={() => console.log('Pressed')}
            />
            <TouchableOpacity style={styles.buttonSubmit} onPress={pressHandler1}>
              <Text style={styles.submitText}>Cadastrar Visitante</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSubmit} onPress={pressHandler2}>
              <Text style={styles.submitText}>Cadastrar Entrega</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: '#50C3F3',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  submitText: {
    fontSize: wp(4.1),
    color: 'grey',
    fontWeight: 'bold',
  },
  buttonSubmit: {
    backgroundColor: 'lime',
    width: wp(45),
    height: hp(10),
    padding: wp(2),
    marginTop: wp(15),
    marginLeft: wp(15),
  }
});