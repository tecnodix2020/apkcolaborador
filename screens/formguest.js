import React, { useState, setState } from 'react';
import { Picker, TouchableOpacity, PixelRatio, Dimensions, StyleSheet, View, TextInput, Text, Button, Image, TouchableWithoutFeedback } from 'react-native';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import DateTimePicker from '@react-native-community/datetimepicker';

import CardView from 'react-native-cardview';

import Input from '../components/Input';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function FormGuest({ route, navigation }) {

  const [selectedValue, setSelectedValue] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const [postText, setPostText] = useState('');

  const onChange = (event, selectedDate) => { 
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleSubmit = () => {
    console.log('submeteu formulário');
    navigation.navigate('Chat');
  }

  const myIcon = (<Icon name="user" size={40} color="black"/>)
  const myIcon2 = (<Icon name="plus" size={20} color="green"/>)

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
            <Input label="Data da Visita" />
            <Input label="Colaborador Adicional" />
            <Text style={styles.txtCombo}> Visitante - Selecione ou Cadastre </Text>
            
            <View style={styles.visit}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 70, width: 300 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="AUGUSTO PEREIRA - SIMÕES" value="Márcio" />
                <Picker.Item label="JOSÉ RICARDO - AMBRAI" value="João" />
                <Picker.Item label="MAURO - TECIDOS TITA" value="João" />
              </Picker>
              
              <TouchableOpacity style={styles.icon} onPress={pressHandlerCreateVisit}>
                {myIcon}
                {myIcon2}
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
    marginTop: wp(5),
  },
  button: {
    height: wp(15),
  },
  txtCombo: {
    fontSize: wp(5.1),
    color: '#042302',
    margin: wp(2),
  },
  visit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: (3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

});




