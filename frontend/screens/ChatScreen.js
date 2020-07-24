import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Header } from 'react-navigation-stack'
import { useDispatch } from 'react-redux';

ChatScreen.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam("name")
});


export default function ChatScreen({navigation}) {
  const dispatch = useDispatch();
  

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
          onSend={messages => 
            dispatch({type: "server/private-message", data: {text: messages[0].text, to: navigation.getParam("userId")}})
          }
          user={{
              _id: 1,
          }}
        /> 
    </View>
  );
}
