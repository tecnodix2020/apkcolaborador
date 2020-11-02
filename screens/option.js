import React from 'react';
import { ScrollView, SafeAreaView, useWindowDimensions, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import CardView from 'react-native-cardview';
//import { createDrawerNavigator } from '@react-navigation/drawer';

import FlashMessage from "react-native-flash-message";

import { Divider } from 'react-native-paper';

import MessageBubble from '../components/MessageBubble';

//const Drawer = createDrawerNavigator();

//function MyDrawer() {
     // return (
       // <Drawer.Navigator>
         // <Drawer.Screen name="Feed" component={Feed} />
         // <Drawer.Screen name="Article" component={Article} />
        //</Drawer.Navigator>
      //);
/*
<Text>{`
    1. Responder que irá até a portaria
    2. Responder para entrar e aguardar
    3. Acionar Equipe Gente
  `}</Text>*/


export default function Option({ navigation }) {

    const pressHandler1 = () => {
        navigation.navigate('FormGuest');
    }

    const pressHandler2 = () => {
        navigation.navigate('FormDelivery');
    }

    return (
      <View style={styles.body}>
          <CardView
            style={styles.card}
            cardElevation={6}
            cardMaxElevation={6}
            cornerRadius={9}>

            <ScrollView>

              <MessageBubble
                mine
                text="Olá Guilherme, tenho uma encomenda para você."
              />
              <MessageBubble
                text="Obrigado, estou indo até aí fazer a retirada."
              />

              <Divider/>
              
              <Text styles={styles.textDate}>
                1 de Outubro 2020
              </Text> 

              <MessageBubble
                mine
                text="Olá Guilherme, cheguei para nossa reunião."
              />
              <MessageBubble
                text="Tudo bem, gentileza entre e aguarde nos bancos, já lhe encontro em alguns minutos."
              />

              <Divider/>

              <Text styles={styles.textDate}>
                15 de Outubro 2020
              </Text> 

              <MessageBubble
                mine
                text="Olá Guilherme, cheguei para nossa reunião."
              />

              <MessageBubble
                mine
                image={require('../img/opcaoentrega1.png')}
              />

              <MessageBubble
                text="Olá, estarei aí em alguns minutos, por gentileza entre e se acomode."
              />
            </ScrollView>

          </CardView>
           

          <View style={styles.options}>
            <TouchableOpacity style={styles.circle1} >
              <Text style={styles.text1}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.circle2} >
              <Text style={styles.text2}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.circle3} >
              <Text style={styles.text3}></Text>
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
  card: {
    margin: wp(3),
    height: '85%',
  },
  textDate: {
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  options: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  circle1: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: 'green',
  },
  circle2: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: 'blue',
  },
  circle3: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: 'red',
  },
  text1: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});