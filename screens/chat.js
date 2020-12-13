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

import Message from '../components/messages';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Chat({ navigation }) {

  const [text, setTextName] = useState('');
  const [textTotem, setTextTotem] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState('');
  const [show, setShow] = useState(false);
  const [valueResponse, setValueResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [showHist, setShowHist] = useState(false);
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

  const handleHistoricMsg = ()=> {
    setTextTotem("Olá " + userLoggedIn + " - teste");
    setShow(!show);
    setShowHist(!showHist);
  }

  const handleMsg1 = () => { 
    setShowResponse(true);
    setValueResponse("Olá, já lhe encontro em alguns minutos");
  }
  const handleMsg2 = () => { 
    setShowResponse(true);
    setValueResponse("Olá, um de nossos colaboradores irá lhe recepcionar em alguns minutos");
  }
  const handleMsg3 = () => { 
    setShowResponse(true);
    setValueResponse("A equipe Gente foi acionada");
  }

  const send = () => {
    console.log("Enviar a mensagem ao totem!");
  }

  const eyeIconShow = (<Icon name="eye" size={30} color="white"/>);
  const eyeIconHide = (<Icon name="eye-slash" size={30} color="white"/>);
  const robot = (<Icon name="envelope" size={40} color="lightgrey"/>);
  
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

          <View style={styles.btnTop}>
            <TouchableOpacity style={styles.submitContainer} onPress={handleHistoricMsg}>
              <Text style={styles.submit}> Histórico </Text>
              {!showHist && (<View>{eyeIconShow}</View>)}
              {showHist && (<View>{eyeIconHide}</View>)}
            </TouchableOpacity>
          </View>

          <Divider/>

          {show && (<ScrollView>

            <Divider/>
            
            <Text styles={styles.textDate}>
              1 de Outubro 2020
            </Text> 

            
            <Message code={1} owner={userLoggedIn} isMine={true}/>
            {robot}
            <Message code={5} isMine={false}/>

            <Divider/>

            <Text styles={styles.textDate}>
              15 de Outubro 2020
            </Text> 

            <Message code={2} owner={userLoggedIn} isMine={true}/>
            {robot}
            <Message code={4} isMine={false}/>

          </ScrollView>
          )}

          {!show && (<View>
          
            <View>
              <Text style={styles.txtMensagen}> Não Há Novas Mensagens </Text>
            </View>
            <View>
              <Message code={1} owner={userLoggedIn} isMine={true}/>
              {robot}
              <TouchableOpacity style={styles.optionsContainer} onPress={handleMsg1}>
                <Text style={styles.txtOptions}> 1 - Irá Receber </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionsContainer} onPress={handleMsg2}>
                <Text style={styles.txtOptions}> 2 - Acionar Outro Colaborador </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionsContainer} onPress={handleMsg3}>
                <Text style={styles.txtOptions}> 3 - Acionar Equipe Gente </Text>
              </TouchableOpacity>
            </View>
            
            {showResponse && (
              <View>
                <MessageBubble text={valueResponse}/>
                <TouchableOpacity style={styles.sendContainer} onPress={send}>
                  <Text style={styles.txtSend}> ENVIAR RESPOSTA </Text>
                </TouchableOpacity>
              </View>)}
          </View>
          )}

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
    alignContent: 'center',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    opacity: 0.8,
    justifyContent: 'flex-end',
  },
  icon: {
    marginRight: wp(2),
  },
  userText: {
    marginRight: wp(30),
    marginTop: wp(2),
    color: 'black',
    fontSize: wp(5.1),
  },
  btnTop: {
    alignItems: 'flex-end',
    marginRight: wp(1),
  },
  submitContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: wp(1),
    marginBottom: wp(2),
    width: '50%',
    flexDirection: 'row',
  },
  submit: {
    fontSize: wp(5.5),
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  txtMensagen: {
    fontSize: wp(3.5),
    marginTop: wp(1.5),
    color: "blue",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  optionsContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: wp(1),
    marginBottom: wp(1),
    marginLeft: wp(8),
    width: '80%',
    flexDirection: 'row',
  },
  txtOptions: {
    fontSize: wp(3.5),
    color: "white",
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  sendContainer: {
    elevation: 8,
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: wp(1),
    marginLeft: wp(60),
    width: wp(20),
    flexDirection: 'row',
    alignSelf: "center",
  },
  txtSend: {
    fontSize: wp(2.5),
    color: "white",
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  }
});