import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated, ImageBackground, FlatList, LogBox, ToastAndroid} from 'react-native';
import CryptoHeader from '../components/Crypto/Home/CryptoHeader'
import CryptoAbout from '../components/Crypto/Home/CryptoAbout'
import CryptoFeature from '../components/Crypto/Home/CryptoFeature'
import TopCrypto from '../components/Crypto/Top100/TopCrypto'
import ExchangeRate from '../components/Crypto/ExchangeRate/ExchangeRate'
import AboutBitcoin from '../components/Crypto/AboutBitcoin/AboutBitcoin'

export default function Crypto({navigation}) {

    const [viewMode, setViewMode] = useState("cryptoHome");

    const sendDataToParent = (index) => {
        setViewMode(index);
    };
    

    function renderCryptoHome() {
        return(
            <ScrollView>

                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white",}}>
                    <View style={{ flexDirection: 'row', marginTop: 10 , marginBottom: 10}}>
                        <TouchableOpacity   style={{ flex: 1,}} 
                                // onPress={() => navigation.toggleDrawer()}
                                onPress={() => ToastAndroid.show("Feature Available Soon...!", 20000)}
                        >
                            
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../assets/icons/menu.png')} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1}}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{  marginLeft: 0, fontSize: 14, fontFamily: "GothamMedium" , color: "black"}}>All Crypto Info</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1,}}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                        </View>
                    </View>
                </View>

                <CryptoHeader />
                <CryptoAbout sendDataToParent={sendDataToParent} />
                <CryptoFeature sendDataToParent={sendDataToParent} />
            </ScrollView>
        )
    }

    function renderTopCrypto(){
        return(
            <ScrollView>
                <TopCrypto sendDataToParent={sendDataToParent} />
            </ScrollView>
        )
    }

    function renderExchangeRate(){
        return(
            <ScrollView>
                <ExchangeRate sendDataToParent={sendDataToParent} />
            </ScrollView>
        )
    }

    function renderBitcoinInfo(){
        return(
            <ScrollView>
                <AboutBitcoin sendDataToParent={sendDataToParent}/>
            </ScrollView>
        )
    }

    function renderTest(){
        return(
            <ScrollView>
                <Text>sample testing</Text>
            </ScrollView>
        )
    }

    return (
        <View>

            {viewMode === "cryptoHome" && renderCryptoHome()}
            {viewMode === "topCrypto" && renderTopCrypto()}
            {viewMode === "exchangeRate" && renderExchangeRate()}
            {viewMode === "aboutBitcoin" && renderBitcoinInfo()}
            {viewMode === "test" && renderTest()}

        </View>
    );
}


const styles = StyleSheet.create({
     
})
