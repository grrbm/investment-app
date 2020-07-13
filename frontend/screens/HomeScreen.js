import React, {useEffect, useState, useRef} from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import io from "socket.io-client"
import { GiftedChat } from 'react-native-gifted-chat';
import JoinScreen from './JoinScreen'
import CONNECT_URL from '../config.js'

export default function HomeScreen() {
  const [messageToSend, setMessageToSend] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  

  useEffect(() => {
    if (socket.current === null){
      //socket.current = io("http://192.168.0.21:3001")
      socket.current = io(CONNECT_URL);
      socket.current.on("message",(message) => {
        debugger;
        console.log("message",message);
        setReceivedMessages((prevState) => GiftedChat.append(prevState, message));
      })
    }
    return function cleanup () {
      console.log("component unmounted !")
    }
  },[])

  const onSend = (messages) => {
    console.log(messages);
    socket.current.emit("message", messages[0].text);
    setReceivedMessages(prevState => GiftedChat.append(prevState, messages));
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  const joinChat = username => {
    socket.current.emit("join", username);
    setHasJoined(true);
  }

  return (  
    <>
        <GiftedChat
          renderUsernameOnMessage
          messages={receivedMessages}
          onSend={messages => onSend(messages)}
          user={{
              _id: 1,
          }}
        /> 
    </>
  );
}