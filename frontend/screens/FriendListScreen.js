import React from "react"
import {View, Text, FlatList} from "react-native"
import { useSelector } from "react-redux"

export default function FriendListScreen() {
    const usersOnline = useSelector(state => state.usersOnline);
    console.log("usersOnline", usersOnline);
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FlatList>
                data={usersOnline}
                renderItem={({item}) => {
                    console.log("item", item);
                    return <Text>(item.username)</Text>
                }}
                keyExtractor={item => item.username}
            </FlatList>
        </View>
    )
}