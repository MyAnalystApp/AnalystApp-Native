import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, FlatList, LogBox, Dimensions } from 'react-native';
const { width } = Dimensions.get("window");

export default function MarketHeader() {

    return (
        <View style={{flex: 1}} >
            <View style={{  width: width -20,  height: 300, marginTop: 10, marginLeft: 10}} > 
                <ImageBackground
                    source={require('../../../assets/images/stock-background.jpg')}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 10}}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 50,
                        borderRadius: 20
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 0
                        }}
                    >
                        <Text style={{color: "white", fontFamily: "GothamBold", fontSize: 22, lineHeight: 22}}>Equity Market</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
   
})
