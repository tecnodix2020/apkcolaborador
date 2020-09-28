import React from 'react';
import { TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FormDelivery({ navigation }) {

    return (
        <View>
          <View style={styles.body}>
            <FAB
                style={styles.fab}
                small
                icon="add"
                onPress={() => console.log('Pressed')}
            />
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
});