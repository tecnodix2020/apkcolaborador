import React, { useState, setState, useEffect } from 'react';
import { ToastAndroid, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import api from '../services/api';

import { Divider } from 'react-native-paper';

import { format, parseISO, isAfter } from "date-fns";

import pt from 'date-fns/locale/pt-BR';

import DateTimePicker from '@react-native-community/datetimepicker';

import CardView from 'react-native-cardview';

import Icon from 'react-native-vector-icons/FontAwesome';

import GuestList from '../components/guests.js';

import EmployeeList from '../components/employees.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormGuest({ route, navigation }) {

  const [date, setDate] = useState(new Date());
  const [displayDate, setDisplayDate] =useState(format(new Date(), "dd 'de' MMMM'", { locale: pt }));
  const [show, setShow] = useState(false);
  const [serverData, serverDataLoaded] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [postText, setPostText] = useState('');
  const [guestPickerValue, setGuestPickerSelectedValue] = useState('');
  const [employeePickerValue, setEmployeePickerSelectedValue] = useState('');

  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTON,
      10,
      20
    );
  };

  const onChange = (event, selectedDate) => { 
    const currentDate = selectedDate || date;
    setShow(false);
    setDisplayDate(format(selectedDate, "dd 'de' MMMM'", { locale: pt }))
    setDate(currentDate);
  }

  const onGuessPickedValueChanged = (childData) => {
    //console.log(childData);
    setGuestPickerSelectedValue(childData);
  }

  const onEmployeePickedValueChanged = (childData) => {
    //console.log(childData);
    setEmployeePickerSelectedValue(childData);
  }

  const handleSubmit = async() => {
    const currentUser = await AsyncStorage.getItem('@App_user');
    var idUser = JSON.parse(currentUser).user.id;
    console.log(format(date,'yyyy-MM-dd'));
    console.log(idUser);
    //showToastWithGravityAndOffset("Visita Salva");
    try {
        const data = {
          idEmployee: 'd17bb389-3823-4bf2-a318-dc35b2646267',
          typeVisit: 1,
          dateVisit: format(date,'yyyy-MM-dd'),
          hourVisit: '12:00:00',
          status: 1,
          subs: ['a4216346-9f00-41f8-905e-e4de38d78ffd']
        }  

        console.log(data);

        const response = await api.post('/api/visits', data);

        const user = response.data;

        console.log(user);

        //const message = await showToastWithGravityAndOffset("Cadastro Efetuado Com Sucesso!");

        //clearFields();
       
      } catch (_err) {
        console.log(_err);
    }
  }
 
  const pressHandlerCalendar = () => {
    console.log("calendario clicado");
    setShow(true);
  }

  const userIcon = (<Icon name="user" size={40} color="black"/>)
  const plusIcon = (<Icon name="plus" size={20} color="green"/>)
  const calendarIcon = (<Icon name="calendar" size={42} color="#54315d" />)

  const pressHandlerCreateVisit = () => {
    navigation.navigate('FormGuestDetails');
  }

  return (
    <View style={styles.body}>
         <CardView
          style={styles.card}
          cardElevation={6}
          cardMaxElevation={6}
          cornerRadius={9}>
          <View>
            <View style={styles.fields}>
              <Text style={styles.txtCombo}>DATA DA VISITA</Text>
              <View style={styles.visitDate}>
                <TouchableOpacity style={styles.iconCalendar} onPress={pressHandlerCalendar}>
                  {calendarIcon}
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconCalendar} onPress={pressHandlerCalendar}>
                  <Text style={styles.txtDate}> {displayDate} </Text>
                </TouchableOpacity>
              </View>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  display="calendar"
                  onChange={onChange}
                />
              )}
            </View>

            <Divider/>

            <View style={styles.fields}>
              <Text style={styles.txtCombo}>COLABORADORES ALTERNATIVOS</Text>
              <EmployeeList parentCallback = {onEmployeePickedValueChanged} />
            </View>

            <Divider/>

            <View style={styles.fields}>
              <Text style={styles.txtCombo}> SELEÇÃO DO VISITANTE </Text>
              <View style={styles.visit}>
                <GuestList parentCallback = {onGuessPickedValueChanged} />
                <TouchableOpacity style={styles.icon} onPress={pressHandlerCreateVisit}>
                  {userIcon}
                  {plusIcon}
                </TouchableOpacity>
              </View>
            </View>

            <Divider/>

          </View>

          <TouchableOpacity style={styles.submitContainer} onPress={handleSubmit}>
            <Text style={styles.submit}> SALVAR </Text>
          </TouchableOpacity>

          
        </CardView>

        <View>
          <Text>{postText}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#50C3F3',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '75%',
    marginTop: wp(15),
    alignItems: 'center',
  },
  txtCombo: {
    fontSize: wp(4.1),
    color: '#042302',
    marginLeft: wp(2),
    fontWeight: 'bold',
    marginTop: wp(4),
  },
  visit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visitDate: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: (3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCalendar: {
    margin: wp(3),
  },
  txtDate: {
    margin: wp(3),
    fontSize: wp(5.1),
  },
  submitContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: wp(5),
    width: '60%',
  },
  submit: {
    fontSize: wp(5.5),
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  fields: {
    margin: wp(2.3),
  }

});




