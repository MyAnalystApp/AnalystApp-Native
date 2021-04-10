import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated, ImageBackground, FlatList, LogBox } from 'react-native';
import TopMarket from '../components/Market/Top/TopMarket';
import MarketHeader from '../components/Market/Home/MarketHeader'
import MarketFeature from '..//components/Market/Home/MarketFeature'
import Sensex from '../components/Market/Sensex/Sensex'
import Nifty from '../components/Market/Nifty/Nifty'

export default function Market({navigation}) {

    const [viewMode, setViewMode] = useState("home");

    const sendDataToParent = (index) => {
        setViewMode(index);
    };

    function renderHome() {
        return(
            <View>

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
                                <Text style={{  marginLeft: 0, fontSize: 14, fontFamily: "GothamMedium" , color: "black"}}>Stocks</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1,}}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                        </View>
                    </View>
                </View>

                <MarketHeader />

                <MarketFeature sendDataToParent={sendDataToParent} />

            </View>
        )
    }

    function renderTopMarket(){
        return(
            <View>
                <TopMarket sendDataToParent={sendDataToParent} />
            </View>
        )
    }

    function renderSensex(){
        return(
            <View>
                <Sensex sendDataToParent={sendDataToParent} />
            </View>
        )
    }

    function renderNifty(){
        return(
            <View>
                <Nifty sendDataToParent={sendDataToParent} />
            </View>
        )
    }

    return (
        <ScrollView>

            {viewMode === "home" && renderHome()}
            {viewMode === "topMarket" && renderTopMarket()}
            {viewMode === "sensex" && renderSensex()}
            {viewMode === "nifty" && renderNifty()}
        
        </ScrollView>
    );
}


const styles = StyleSheet.create({
     
})
