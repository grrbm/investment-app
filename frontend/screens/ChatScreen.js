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
  const conversations = useSelector(state =>{
                                                console.log("conversations updated to "+JSON.stringify(state.conversations));
                                                return state.conversations
                                            });
  const userId = navigation.getParam("userId");
  const messages = conversations[selfUser.userId].messages;
  
  return (  
    <View style={{flex:1}}>
        <GiftedChat
          renderUsernameOnMessage
          messages={messages}
          onSend={messages =>
            { 
              dispatch({
                type: "private_message", 
                data: { message: messages[0], conversationId: selfUser.userId }
              });
              dispatch({
                type: "server/private_message",
                data: { message: messages[0], conversationId: userId }
              });
            }
          }
          user={{
              _id: userId
          }}
        />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
