import React from "react"
import {View, Text, FlatList, StyleSheet, StatusBar,Image} from "react-native"
import { useSelector } from "react-redux"

export default function FriendListScreen() {
    const usersOnline = useSelector(state => state.usersOnline);
    console.log("usersOnline:", usersOnline);
    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        },
        item: {
          backgroundColor: '#f9c2ff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        },
        title: {
          fontSize: 32,
        },
      });
      
    const renderItem = ({ item }) => (
        <Item username={item.username} />
    );      
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>This is the friend list screens</Text>
            <FlatList
              data={usersOnline}
              renderItem={({ item }) => {
                console.log("item", item);
                return (
                    <View style={styles}>
                      <View>
                        <Image 
                          style={{width:100, height:100,borderRadius:50}}
                          source={{uri:item.avatar}}
                        />
                        <Text style={{ fontSize: 20 }}>{item.username}</Text>
                      </View>
                    </View>
                );
              }}
              keyExtractor={item => item.userId}
            />
        </View>
    )
}