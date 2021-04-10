import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export default function ExchangeCard() {

    return (
        <View style={{paddingLeft: 14, paddingRight: 14, marginTop: 14}}>
            <View
                style={{
                    width: width-28,
                    paddingTop: 10,
                    paddingBottom: 30,
                    marginLeft: 0,
                    marginRight: 10,
                    borderRadius: 10,
                    backgroundColor: "white"
                }}
            >
                <View style={{flexDirection: 'column'}}>
                    <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={require('../../../assets/images/exchange-rate.png')}
                            resizeMode="cover"
                            style={{
                                marginBottom: 0,
                                width: 120,
                                height: 120,
                                marginTop: 0
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30, alignSelf: 'center'}}>BTC Exchange Rates.</Text>
                        <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22, alignSelf: 'center', marginHorizontal: 20, marginTop: 10}}>This page shows the exchange rates of all currencies around the world as compared to Bitcoin. This will help you to compare different currencies with Bitcoin .</Text>
                    </View>

                </View>

            </View>
        </View>
    );
};