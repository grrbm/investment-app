import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import io from "socket.io-client"
import { GiftedChat } from 'react-native-gifted-chat';

export default function HomeScreen() {
  const [messageToSend, setMessageToSend] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.0.21:3001")
    socket.current.on("message",(message) => {
      const testMessage = {
        _id: 3,
        text: 'Hello developer',
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      };
      testMessage.text = message;
      setReceivedMessages((prevState) => GiftedChat.append(prevState, testMessage));
    })
    setReceivedMessages(
      [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
      ],)
  },[])

  const sendMessage = () => {
    console.log("sending "+messageToSend+" to all cellphones")
    socket.current.emit("message", messageToSend)
    setMessageToSend("")
  }

  const textOfReceivedMessages = receivedMessages.map(msg => {
    return <Text key={msg}>{msg}</Text>
  })

  const onSend = (messages) => {
    socket.current.emit("message", messages[0].text);
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
