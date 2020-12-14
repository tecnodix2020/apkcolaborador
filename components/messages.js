import React, { Component, useState, setState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableWithoutFeedback, FlatList, SafeAreaView } from 'react-native';

import api from '../services/api';

import MessageBubble from '../components/messagebubble';

export default class Messages extends Component {

  constructor(props) {
      super(props);
      this.state = {
          data: [],
      }
  }
  
  loadMessages = async() => { 
    try {
      var response = await api.get('/messages');

      //console.log(response.data);

      this.setState ({
                  data: response.data.map(item => {
                    return { id: item.id, description: item.description}
                  }) || []
              });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
      this.loadMessages();
  }

  sendData = (value) => {
      this.props.parentCallback(value);
  }

  messageList =  (value, isMine) => {
    return( this.state.data.map( (data,i) => { 
        return(<MessageBubble mine={isMine} key={i} text={this.state.data[value].description} />)} )); 
  }

  extractMessage = (code, owner) => {
      let msg = '';
      switch(code) {
        case 1 : msg = "Olá " + owner + ", uma visita lhe aguarda na portaria."; break;
        case 2 : msg = "Olá " + owner + ", chegou uma entrega para você."; break;
        case 3 : msg = "Obrigado(a), estou indo aí fazer a retirada."; break;
        case 4 : msg = "Olá, um de nossos colaboradores irá receber em alguns minutos"; break;
        case 5 : msg = "Olá, já lhe encontro em alguns minutos"; break;
        case 6 : msg = "Olá, um de nossos colaboradores irá lhe recepcionar em alguns minutos"; break;
        case 7 : msg = "A equipe Gente foi acionada"; break;
        default: msg = ""; break;
      }
      return msg;
  }

  render() {
    return (
        <MessageBubble mine={this.props.isMine} text={this.extractMessage(this.props.code, this.props.owner)} />
    );
  }
}

const styles = StyleSheet.create({
});

/*
<View >
            { this.messageList(this.props.value, this.props.mine)}
        </View>

{this.state.data[this.props.code].description}

*/