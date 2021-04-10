import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, FlatList, LogBox } from 'react-native';


export default function MarketFeature({sendDataToParent}) {

    return (
        <View style={{flex: 1, paddingBottom: 10}}>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 14,
                    paddingVertical: 24,
                    paddingHorizontal: 8,
                    backgroundColor: "white",
                    borderRadius: 8,
                    marginTop: 20
                }}
                onPress = {() => sendDataToParent("topMarket")}
            >
                <View style={{flexDirection: 'column', marginLeft: 8}}>
                    <View style={{flexDirection: 'row', }}>
                        <Image
                            source={require('../../../assets/icons/stock-icon.webp')}
                            style={{
                                width: 35,
                                height: 35,
                                marginRight: 8
                            }}
                        />
                        <Text style={{fontFamily: "GothamBold", alignSelf: 'center', fontSize: 14}}>View All Market</Text>
                        
                    </View>
                    <Text style={{fontFamily: "GothamLight", marginRight: 8, fontSize: 12, lineHeight: 14, marginTop: 8}}>This is a temporary button to navigate to market list</Text>
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


            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 14,
                    paddingVertical: 24,
                    paddingHorizontal: 8,
                    backgroundColor: "white",
                    borderRadius: 8,
                    marginTop: 20
                }}
                onPress = {() => sendDataToParent("sensex")}
            >
                <View style={{flexDirection: 'column', marginLeft: 8}}>
                    <View style={{flexDirection: 'row', }}>
                        <Image
                            source={require('../../../assets/icons/bse.png')}
                            style={{
                                width: 35,
                                height: 35,
                                marginRight: 8
                            }}
                        />
                        <Text style={{fontFamily: "GothamBold", alignSelf: 'center', fontSize: 14}}>Sensex 30</Text>
                        
                    </View>
                    <Text style={{fontFamily: "GothamLight", marginRight: 8, fontSize: 12, lineHeight: 14, marginTop: 8}}>View all sensex companies.</Text>
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


            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 14,
                    paddingVertical: 24,
                    paddingHorizontal: 8,
                    backgroundColor: "white",
                    borderRadius: 8,
                    marginTop: 20
                }}
                onPress = {() => sendDataToParent("nifty")}
            >
                <View style={{flexDirection: 'column', marginLeft: 8}}>
                    <View style={{flexDirection: 'row', }}>
                        <Image
                            source={require('../../../assets/icons/nse.jpg')}
                            style={{
                                width: 32,
                                height: 32,
                                marginRight: 8
                            }}
                        />
                        <Text style={{fontFamily: "GothamBold", alignSelf: 'center', fontSize: 14}}>Nifty 50</Text>
                        
                    </View>
                    <Text style={{fontFamily: "GothamLight", marginRight: 8, fontSize: 12, lineHeight: 14, marginTop: 8}}>View all nifty companies.</Text>
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

        </View>
    );
}


const styles = StyleSheet.create({
   
})
