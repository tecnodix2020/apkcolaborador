import React, {setState, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Alert, ScrollView, SafeAreaView, useWindowDimensions, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import messaging from '@react-native-firebase/messaging';

import { format, parseISO, isAfter } from "date-fns";

import pt from 'date-fns/locale/pt-BR';

import CardView from 'react-native-cardview';

import FlashMessage from "react-native-flash-message";

import { Divider } from 'react-native-paper';

import MessageBubble from '../components/messagebubble';

import Message from '../components/messages';

import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../services/api';

export default function Chat({ navigation }) {

  const [text, setTextName] = useState('');
  const [textTotem, setTextTotem] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState('');
  const [userLoggedInID, setUserLoggedInID] = useState('');
  const [show, setShow] = useState(false);
  const [newMsg, setNewMsg] = useState(false);
  const [valueResponse, setValueResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [showHist, setShowHist] = useState(false);
  const [msgTotem, setMessageTotem] = useState('');
  const menuIcon = (<Icon name="bars" size={40} color="grey"/>)

  const openLeftMenu = () => {
    navigation.toggleDrawer();
  }

  const getUserLoggedName = async() => {
    const currentUser = await AsyncStorage.getItem('@App_user');
    setUserLoggedInID(JSON.parse(currentUser).user.id);
    setUserLoggedIn(JSON.parse(currentUser).user.name);
  }

  useEffect(() => {
    let isMounted = true;
    getUserLoggedName();
    return () => { isMounted = false }; 
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setNewMsg(true);
      //Alert.alert("Chegou Mensagem!", JSON.stringify(remoteMessage.notification.body));
    });
    return unsubscribe;
  }, []);

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
    setValueResponse("A equipe Gente será acionada");
  }

  const sendMessageToTotem = async() => {
    console.log("Enviar a mensagem ao totem!");
    setNewMsg(false);
    setShowResponse(false);
    try {

        const messageToTotem = {
          "idMessage": 6,
          "idEmployee": userLoggedInID,
          "dateMessage": format(new Date(), 'yyyy-MM-dd', { locale: pt }),
          "hourMessage": format(new Date(), 'hh:mm', { locale: pt }),
          "status": 3
        }  

        console.log(messageToTotem);

        const response = await api.post('/msgsbyemployee', messageToTotem);

        const returnedValue = response.data;

        console.log(returnedValue);

        const message = await showToastWithGravityAndOffset("Mensagem Enviada Com Sucesso!");

      } catch (_err) {
        showToastWithGravityAndOffset("Erro ao enviar a mensagem!");
        console.log(_err);
    }
  }

  const eyeIconShow = (<Icon name="eye" size={30} color="white"/>);
  const eyeIconHide = (<Icon name="eye-slash" size={30} color="white"/>);
  const letter = (<Icon name="envelope" size={40} color="lightgrey"/>);

  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      10,
      20
    );
  };
  
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
            {letter}
            <Message code={5} isMine={false}/>

            <Divider/>

            <Text styles={styles.textDate}>
              15 de Outubro 2020
            </Text> 

            <Message code={2} owner={userLoggedIn} isMine={true}/>
            {letter}
            <Message code={4} isMine={false}/>

          </ScrollView>
          )}

          {!newMsg && !show && (<View>
            <Text style={styles.txtMensagen}> Não Há Novas Mensagens </Text>
            <Image style={styles.imgRelax} source={require('../img/relax.png')} />
            </View>
          )}
          
          {!show && newMsg && (<View>
              <Message code={1} owner={userLoggedIn} isMine={true}/>
              {letter}
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
          )}
            
          {showResponse && newMsg && (<View>
              <MessageBubble text={valueResponse}/>
              <TouchableOpacity style={styles.sendContainer} onPress={sendMessageToTotem}>
                <Text style={styles.txtSend}> ENVIAR RESPOSTA </Text>
              </TouchableOpacity>
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
    marginTop: wp(15),
    color: "darkblue",
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
  },
  imgRelax: {
    width: wp(35),
    height: hp(25),
    marginTop: wp(8),
    opacity: 0.2,
    alignSelf: "center",
  }
});