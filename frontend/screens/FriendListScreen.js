import React from "react"
import {View, Text, FlatList, StyleSheet, TouchableOpacity,Image} from "react-native"
import { useSelector } from "react-redux"



export default function FriendListScreen({navigation}) {
    const usersOnline = useSelector(state => state.usersOnline);
    const { itemContainerStyle, avatarImgStyle, avatarNameViewStyle } = styles;

    return (
        <View style={{flex:1}}>
            <FlatList
              data={usersOnline}
              renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate("Chat", { name:item.username, userId: item.userId })}>
                      <View style={itemContainerStyle}>
                        <View>
                          <Image 
                            style={avatarImgStyle}
                            source={{uri:item.avatar}}
                          />
                        </View>
                        <View style={avatarNameViewStyle}>
                          <Text style={{fontSize:20}}>{item.username}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.userId}
            />
        </View>
    )
}
const styles = StyleSheet.create({
  itemContainerStyle: {flex:1, flexDirection:'row'},
  avatarImgStyle: {width:100, height:100,borderRadius:50},
  avatarNameViewStyle: {flex:1,alignItems: 'center', justifyContent: 'center'}
})
