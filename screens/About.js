import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated, ImageBackground, FlatList, LogBox } from 'react-native';

export default function About({navigation}) {

    return (
        <ScrollView>

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white",}}>
                <View style={{ flexDirection: 'row', marginTop: 10 , marginBottom: 10}}>
                    <TouchableOpacity   style={{ flex: 1,}} 
                            onPress={() => navigation.toggleDrawer()}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../assets/icons/menu.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 14, fontFamily: "GothamMedium" , color: "black"}}>About</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
                </View>
            </View>


            <View style={{  width: "100%",  height: 320 }} > 
                <ImageBackground
                    source={require('../assets/images/about-background.jpeg')}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 50
                    }}
                >
                    {/* <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 50
                        }}
                    >
                        <Text style={{color: "white", fontFamily: "GothamBold", fontSize: 22, lineHeight: 22}}>About</Text>
                    </View> */}
                </ImageBackground>
            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
     
})
