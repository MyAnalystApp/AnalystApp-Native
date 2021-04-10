import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';

const { width } = Dimensions.get("window");

export default function CryptoFeature({sendDataToParent}) {

    const [viewMode, setViewMode] = useState("allCrypto");

    return (
        <View style={{flexDirection: 'row', marginLeft: 14, marginRight: 14, marginTop: 14}}>
            <TouchableOpacity
                style={{
                    width: width/2 -19,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingHorizontal: 0,
                    marginLeft: 0,
                    marginRight: 10,
                    borderRadius: 10,
                    backgroundColor: "white"
                }}
                onPress = {() => sendDataToParent("topCrypto")}
            >
                <View style={{flexDirection: 'column'}}>
                    <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={{ uri: `https://icon-library.com/images/100-icon/100-icon-0.jpg`}}
                            resizeMode="cover"
                            style={{
                                marginTop: 0,
                                width: 30,
                                height: 30,
                                marginTop: 5
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30, alignSelf: 'center'}}>Top 100</Text>
                        <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22, alignSelf: 'center'}}>Cryptocurrency</Text>
                    </View>

                </View>

                {/* Value */}
                <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color:"black", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 30}}>View All</Text>
                    <Image
                        source={require('../../../assets/icons/right-arrow.png')}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: "grey",
                            marginLeft: 8,
                        }}
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    width: width/2 -20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingHorizontal: 0,
                    marginLeft: 0,
                    marginRight: 10,
                    borderRadius: 10,
                    backgroundColor: "white"
                }}
                onPress = {() => sendDataToParent("exchangeRate")}
            >
                <View style={{flexDirection: 'column'}}>
                    <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={{ uri: `https://www.iconpacks.net/icons/2/free-coin-exchange-icon-2427-thumb.png`}}
                            resizeMode="cover"
                            style={{
                                marginTop: 0,
                                width: 30,
                                height: 30,
                                marginTop: 5
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30, alignSelf: 'center'}}>BTC</Text>
                        <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22, alignSelf: 'center'}}>Exchange rates</Text>
                    </View>

                </View>

                {/* Value */}
                <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color:"black", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 30}}>View All</Text>
                    <Image
                        source={require('../../../assets/icons/right-arrow.png')}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: "grey",
                            marginLeft: 8,
                        }}
                    />
                </View>
            </TouchableOpacity>
            
        </View>
    );
}


const styles = StyleSheet.create({

})
