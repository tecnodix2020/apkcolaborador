import React, {setState, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, SafeAreaView, useWindowDimensions, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CardView from 'react-native-cardview';

import FlashMessage from "react-native-flash-message";

import { Divider } from 'react-native-paper';

import MessageBubble from '../components/messagebubble';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Chat({ navigation }) {

  const [text, setTextName] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState('');

  const menuIcon = (<Icon name="bars" size={40} color="grey"/>)

  const openLeftMenu = () => {
    navigation.toggleDrawer();
  }

  const getUserLoggedName = async() => {
    const currentUser = await AsyncStorage.getItem('@App_user');
    setUserLoggedIn(JSON.parse(currentUser).user.name);
  }

  useEffect(() => {
    let isMounted = true;
    getUserLoggedName();
    return () => { isMounted = false }; 
  });
  
  return (
    <View style={styles.body}>
        <View style={styles.menu}>
            <Text style={styles.userText}>Olá {userLoggedIn}</Text>
            <TouchableOpacity style={styles.icon} onPress={openLeftMenu}>
              {menuIcon}
            </TouchableOpacity>
        </View>

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
              text={text}
            />
          </ScrollView>

        </CardView>

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
  },
  menu: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    opacity: 0.8,
  },
  icon: {
    marginLeft: wp(2),
  },
  userText: {
    marginLeft: wp(5),
    alignContent: 'center',
    marginTop: wp(2),
    color: 'black',
    fontSize: wp(4.6),
  }
});