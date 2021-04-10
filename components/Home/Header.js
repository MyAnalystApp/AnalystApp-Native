import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native'

export default function Header({navigation}) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white",}}>
            <View style={{ flexDirection: 'row', marginTop: 10 , marginBottom: 10}}>
                <TouchableOpacity   style={{ flex: 1,}} 
                            onPress={() => navigation.toggleDrawer()}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../../assets/icons/menu.png')} />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1}}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{  marginLeft: 0, fontSize: 18, fontFamily: "GothamMedium" , color: "black"}}>Home</Text>
                    </View>
                </View>
                <View style={{ flex: 1,}}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                </View>
            </View>
        </View>
    );
};