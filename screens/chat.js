import React, {setState, useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, useWindowDimensions, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CardView from 'react-native-cardview';

import FlashMessage from "react-native-flash-message";

import { Divider } from 'react-native-paper';

import MessageBubble from '../components/MessageBubble';

export default function Chat({ navigation }) {

    const [text, setTextName] = useState(''); 

    const handleGreenPress = () =>{
      setTextName('Olá, estou indo até aí lhe recepcionar')
    }
    const handleBluePress = () =>{
      setTextName('Olá, gentileza acomodesse que estarei aí em alguns minutos')
    }
    const handleRedPress = () =>{
      setTextName('Olá, vou acionar um colaborador para te acompanhar até o local da reunião')
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
                text={text}
              />
            </ScrollView>

          </CardView>
           

          <View style={styles.options}>
            <TouchableOpacity style={styles.circle1} onPress={handleGreenPress} >
              <Text style={styles.text1}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.circle2} onPress={handleBluePress} >
              <Text style={styles.text2}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.circle3} onPress={handleRedPress}  >
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