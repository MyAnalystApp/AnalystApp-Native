import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, Linking} from 'react-native';

export default function CryptoAbout({sendDataToParent}) {

    return (
        <View>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 14,
                    paddingVertical: 24,
                    paddingHorizontal: 8,
                    backgroundColor: "white",
                    borderRadius: 8,
                }}
                onPress = {() => sendDataToParent("aboutBitcoin")}
            >
                <View style={{flexDirection: 'column', marginLeft: 8}}>
                    <View style={{flexDirection: 'row', }}>
                        <Image
                            source={require('../../../assets/icons/blockchain-logo.png')}
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 8
                            }}
                        />
                        <Text style={{fontFamily: "GothamBold", alignSelf: 'center', fontSize: 14}}>About Blockchain & Cryptocurrency</Text>
                        
                    </View>
                    <Text style={{fontFamily: "GothamLight", marginRight: 8, fontSize: 12, lineHeight: 14, marginTop: 8}}>Cryptocurrency is simply the first application of the blockchain technology, and it was introduced as a financial instrument.</Text>
                </View>
                <Image
                    source={require('../../../assets/icons/right-arrow.png')}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: "grey",
                        marginLeft: 8
                    }}
                />
            </TouchableOpacity>

            <View
                style={{
                    marginTop: 16,
                    marginHorizontal: 14,
                    padding :20,
                    borderRadius: 8,
                    backgroundColor: "#5D2DFD"
                }}
            >
                <Text style={{fontFamily: "GothamBold", color: "white", fontSize: 15}}>Investing Info</Text>
                <Text style={{
                    lineHeight: 18,
                    marginTop: 12,
                    fontFamily: "GothamLight", 
                    color: "white",
                    fontSize: 12
                }}>This App is not for investment purpose, it's only for your daily cryptocurrency updates/info and to know how their rates changes, so that you can learn about it.</Text>

                <TouchableOpacity style={{marginTop: 12}}
                    onPress={() => {Linking.openURL("https://www.investopedia.com/articles/investing/082914/basics-buying-and-investing-bitcoin.asp")}}
                >
                    <Text
                        style={{
                            textDecorationLine: 'underline',
                            color: "#37E39F",
                            fontFamily: "GothamMedium",
                            fontSize: 14
                        }}
                    >
                        Learn More
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({

})
