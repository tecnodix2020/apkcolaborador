import React from 'react';
import { useWindowDimensions, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
//import { createDrawerNavigator } from '@react-navigation/drawer';

import FlashMessage from "react-native-flash-message";
import { CardViewWithIcon } from "react-native-simple-card-view";
import { Divider } from 'react-native-paper';

//const Drawer = createDrawerNavigator();

//function MyDrawer() {
     // return (
       // <Drawer.Navigator>
         // <Drawer.Screen name="Feed" component={Feed} />
         // <Drawer.Screen name="Article" component={Article} />
        //</Drawer.Navigator>
      //);

export default function Option({ navigation }) {

    const pressHandler1 = () => {
        navigation.navigate('FormGuest');
    }

    const pressHandler2 = () => {
        navigation.navigate('FormDelivery');
    }

    const miniCardStyle = {
      shadowColor       : '#000000',
      shadowOffsetWidth : 2,
      shadowOffsetHeight: 2,
      shadowOpacity     : 0.1,
      hadowRadius      : 5,
      bgColor           : '#ffffff',
      padding           : 5,
      margin            : 5,
      borderRadius      : 3,
      elevation         : 3,
      width             : (Dimensions.get("window").width / 2) - 10
    }

    return (

        //<MyDrawer />
        <View>
          <View style={styles.body}>
            <TouchableOpacity style={styles.buttonSubmit} onPress={pressHandler1}>
              <Text style={styles.submitText}>Cadastrar Visitante</Text>
            </TouchableOpacity>

            <Divider />

            <TouchableOpacity style={styles.buttonSubmit} onPress={pressHandler2}>
              <Text style={styles.submitText}>Cadastrar Entrega</Text>
            </TouchableOpacity>

            <Divider />

            <CardViewWithIcon
              withBackground={ false }
              androidIcon={ 'md-jet' }
              iosIcon={ 'ios-jet-outlin' }
              iconHeight={ wp(45) }
              iconColor={ '#ff0000' }
              title={ 'Notificações' }
              contentFontSize={ 10 }
              titleFontSize={ wp(3.5) }
              //style={ miniCardStyle }
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
  submitText: {
    fontSize: wp(4.1),
    fontWeight: 'bold',
  },
  buttonSubmit: {
    backgroundColor: 'lightgreen',
    width: wp(25),
    height: hp(12),
    padding: wp(2),
    marginTop: wp(10),
    marginLeft: wp(10),
    textShadowColor: 'rgba(1, 0, 0, 0.75)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10
  }
});