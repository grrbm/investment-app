import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Header } from 'react-navigation-stack'
import { useDispatch, useSelector } from 'react-redux';

ChatScreen.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam("name")
});


export default function ChatScreen({navigation}) {
  const dispatch = useDispatch();
  const selfUser = useSelector(state => state.selfUser);  
  const conversations = useSelector(state => state.conversations);
  const userId = navigation.getParam("userId");
  const messages = conversations[userId].messages;

  
  return (  
    <View style={{flex:1}}>
        <GiftedChat
          renderUsernameOnMessage
          messages={[]}
          onSend={messages =>
            { 
            dispatch({
              type: "private_message", 
              data: { message: messages[0], conversationId: userId }
            });
            dispatch({
              type: "server/private_message",
              data: { message: messages[0], conversationId: userId }
            });
            }
          }
          user={{
              _id: selfUser.userId
          }}
        />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
