import React, {useEffect, useState, useRef} from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import io from "socket.io-client"
import { GiftedChat } from 'react-native-gifted-chat';

const RUN_ON_HEROKU = true;

export default function HomeScreen() {
  const [messageToSend, setMessageToSend] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = useRef(null);

  const CONNECT_URL = RUN_ON_HEROKU 
                      ? 'http://grrbm-investment-app.herokuapp.com'
                      : 'http://192.168.0.21:3001' 

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
  return (  
      <GiftedChat
        messages={receivedMessages}
        onSend={messages => onSend(messages)}
        user={{
            _id: 1,
        }}
      />
  );
}
