import React, { useState, setState, useEffect } from 'react';
import { ToastAndroid, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import api from '../services/api';

import { format, parseISO, isAfter } from "date-fns";

import pt from 'date-fns/locale/pt-BR';

import DateTimePicker from '@react-native-community/datetimepicker';

import CardView from 'react-native-cardview';

import Icon from 'react-native-vector-icons/FontAwesome';

import GuestList from '../components/guests.js';

import EmployeeList from '../components/employees.js';

export default function FormGuest({ route, navigation }) {

  const [pickerValue, setPickerSelectedValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [displayDate, setDisplayDate] =useState(format(new Date(), "dd 'de' MMMM'", { locale: pt }));
  const [show, setShow] = useState(false);
  const [serverData, serverDataLoaded] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [postText, setPostText] = useState('');

  const onChange = (event, selectedDate) => { 
    const currentDate = selectedDate || date;
    setShow(false);
    setDisplayDate(format(selectedDate, "dd 'de' MMMM'", { locale: pt }))
    setDate(currentDate);
  }

  const onPickerGuessChanged = (childData) => {
      console.log(childData);
      setPickerSelectedValue(childData);
  }

  const handleSubmit = () => {
    console.log(date);
    console.log(pickerValue);
  }

  const pressHandlerCalendar = () => {
    console.log("calendario clicado");
    setShow(true);
  }

  const userIcon = (<Icon name="user" size={40} color="black"/>)
  const plusIcon = (<Icon name="plus" size={20} color="green"/>)
  const calendarIcon = (<Icon name="calendar" size={40} color="black"/>)

  const pressHandlerCreateVisit = () => {
    navigation.navigate('FormGuestDetails');
  }

  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTON,
      10,
      20
    );
  };

  return (
    <View style={styles.body}>
         <CardView
          style={styles.card}
          cardElevation={6}
          cardMaxElevation={6}
          cornerRadius={9}>
          <View>
            <View style={styles.visitDate}>
              <View style={{ height: 90, width: 280 }} >
                <Text style={styles.txtCombo}> Selecione a Data da Visita</Text>
                <Text
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                >
                {displayDate}
                </Text>
              </View>
              <TouchableOpacity style={styles.iconCalendar} onPress={pressHandlerCalendar}>
                {calendarIcon}
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  display="calendar"
                  onChange={onChange}
                />
              )}
            </View>

            <View>
              <Text style={styles.txtCombo}> Adicione Colaborador Adicional</Text>
              <EmployeeList />
            </View>

            <Text style={styles.txtCombo}> Visitante - Selecione ou Cadastre </Text>
            <View style={styles.visit}>
              <GuestList 
                parentCallback = {onPickerGuessChanged} // parentCallback is props from child
              />
              <TouchableOpacity style={styles.icon} onPress={pressHandlerCreateVisit}>
                {userIcon}
                {plusIcon}
              </TouchableOpacity>
            </View>

            <Button
              style={styles.button}
              onPress={handleSubmit}
              title="Salvar"
            />
          </View>
          
        </CardView>
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
    marginTop: wp(15),
  },
  button: {
    height: wp(15),
  },
  txtCombo: {
    fontSize: wp(5.1),
    color: '#042302',
    margin: wp(2),
    fontWeight: 'bold'
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
    marginTop: wp(12),
  }

});




