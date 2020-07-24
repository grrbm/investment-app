import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen() {

  ChatScreen.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam("name")
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  return (  
    <View style={{flex:1}}>
        <GiftedChat
          renderUsernameOnMessage
          messages={[]}
          //onSend={messages => onSend(messages)}
          user={{
              _id: 1,
          }}
        /> 
    </View>
  );
}
