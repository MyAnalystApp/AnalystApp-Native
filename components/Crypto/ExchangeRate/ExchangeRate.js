import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, LogBox } from 'react-native';
import ExchangeCard from './BtcExchangeCard';

const { width } = Dimensions.get("window");

export default function ExchangeRate({sendDataToParent}) {

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        );
    }

    const[exchangeData, setExchangeData] = useState(null);
    const [efficientExchangeData, setEfficientExchangeData] = useState(null);
    const[selectMode, setSelectMode] = useState(false);
    const[coinA, setCoinA] = useState({
        unit: "---",
        name: "----",
        type: "----",
        rate: 0,
    });
    const[coinB, setCoinB] = useState({
        unit: "---",
        name: "----",
        type: "----",
        rate: 0,
    });

    const [ count, setCount] = useState(1);

    const fetchExchangeData = () => {
        fetch("https://api.coingecko.com/api/v3/exchange_rates")
        .then(res=>res.json())
        .then(result_coin=>{
            setExchangeData([result_coin.rates]);
        })
    }

    useEffect(()=>{
        fetchExchangeData(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[])

    function processData() {
        if(exchangeData!=null && exchangeData!=undefined) {
            setCoinA(exchangeData[0].btc);

            let data = [], i=0;
            Object.keys(exchangeData[0]).forEach((key) => {
                data[i] = exchangeData[0][key];
                i++;
            })

            setEfficientExchangeData(data);
            setCount(2);
        }
    }

    function renderAllCoin() {

        function setCoin(val){
            setCoinB(val);
            setSelectMode(false);
        }

        return(
            <View>
                {efficientExchangeData.map((coin) => {
                    return (
                        <TouchableOpacity 
                            key={efficientExchangeData.indexOf(coin)}
                            style={{ justifyContent: 'center', paddingHorizontal: 20, marginTop: 10}}
                            onPress={() => {
                                setCoin(coin);
                            }}
                        >
                            <View style={{ flexDirection: 'row', height: 50, backgroundColor: "white", borderRadius: 8}}>
                                <View style={{ flex: 1, borderRadius: 6,justifyContent: 'center'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 10
                                        }}>
                                        </View>
                                        <View style={{marginLeft: 8, justifyContent: 'center', flexDirection: 'row'}}>
                                            <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 14, lineHeight: 30}}>{coin.name} </Text>
                                            <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 14, lineHeight: 30}}>({coin.unit})</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{marginHorizontal: 20, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>   
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{ 
                                                marginLeft: 0, 
                                                fontSize: 14, 
                                                fontFamily: 'GothamMedium', 
                                                lineHeight: 22, 
                                                color: "grey"
                                            }}>Type: </Text>
                                            <Text style={{ 
                                                marginLeft: 0, 
                                                fontSize: 14, 
                                                fontFamily: 'GothamMedium', 
                                                lineHeight: 22, 
                                                color:  "#37E39F", 
                                            }}>{coin.type}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <View>

            {/* Header */}
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white",}}>
                <View style={{ flexDirection: 'row', marginTop: 10 , marginBottom: 10}}>
                    <TouchableOpacity   style={{ flex: 1,}} 
                            onPress = {() => sendDataToParent("cryptoHome")}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../../../assets/icons/back_arrow.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 14, fontFamily: "GothamMedium" , color: "black"}}>Exchange Rates</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
                </View>
            </View>

            <ExchangeCard />

            { exchangeData == null ? (

                <View style={{alignItems: 'center', marginTop: width/2}}>
                    <Text style={{fontSize: 20, fontFamily: "GothamMedium" , color: "black"}}>Loading...</Text>
                </View>
            
            ) : (
                
                <View style={{flexDirection: 'column', justifyContent: 'center', marginTop: 14}}>

                    {((exchangeData!==null) && exchangeData!==undefined && (count==1)) ? processData() : null}

                    {coinB.unit === "---" ? (
                        <View style={{paddingLeft: 14, paddingRight: 14, marginBottom: 10}}>
                            <View
                                style={{
                                    width: width-28,
                                    paddingTop: 10,
                                    paddingBottom: 20,
                                    marginLeft: 0,
                                    marginRight: 10,
                                    borderRadius: 10,
                                    backgroundColor: "white"
                                }}
                            >
                                <View style={{flexDirection: 'column'}}>
                                    <View style={{ alignItems: 'center'}}>
                                        <Image 
                                            source={require('../../../assets/icons/bitcoin.webp')}
                                            resizeMode="cover"
                                            style={{
                                                marginBottom: 0,
                                                width: 55,
                                                height: 55,
                                                marginTop: 10
                                            }}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30, alignSelf: 'center'}}>Bitcoin (BTC)</Text>
                                        <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22, alignSelf: 'center', marginTop: 5}}>Compare rates of Bitcoin with other coins and currencies.</Text>
                                    </View>
                
                                </View>
                
                            </View>
                        </View>
                    ) : (

                    <View style={{flexDirection: 'row',paddingLeft: 7, paddingRight: 7, marginBottom: 10}}>
                            {/* Coin: A */}
                        <View
                            style={{
                                width: width/2 - 14,
                                height: width/2,
                                paddingTop: 10,
                                paddingBottom: 10,
                                marginLeft: 7,
                                marginRight: 0,
                                backgroundColor: "white",
                                borderBottomLeftRadius:10,
                                borderTopLeftRadius: 10,
                                borderRightWidth:1,
                                borderRightColor: "#ccc",
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <View style={{flexDirection: 'column'}}>
                                <View style={{ alignItems: 'center'}}>
                                    <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 26, lineHeight: 30, alignSelf: 'center'}}>{coinA.unit}</Text>
                                </View>
                                <View> 
                                    <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 14, lineHeight: 30, alignSelf: 'center'}}>({coinA.name})</Text>
                                </View>
                                <View style={{marginTop: 10, padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#ccc'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontFamily: 'GothamMedium', fontSize: 14, color: 'grey'}}>Exchange Rate: </Text>
                                        <Text style={{fontFamily: 'GothamMedium', fontSize: 14, color: '#37E39F', marginBottom: 5}}>{coinA.value}</Text>
                                    </View>

                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontFamily: 'GothamMedium', fontSize: 14, color: 'grey'}}>Type: </Text>
                                        <Text style={{fontFamily: 'GothamMedium', fontSize: 14, color: '#37E39F'}}>{coinA.type}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Coin: B */}
                        <View
                            style={{
                                width: width/2 -14,
                                height: width/2,
                                paddingTop: 10,
                                paddingBottom: 10,
                                marginLeft: 0,
                                marginRight: 7,
                                backgroundColor: "white",
                                borderBottomRightRadius: 10,
                                borderTopRightRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <View style={{flexDirection: 'column'}}>
                                <View style={{ alignItems: 'center'}}>
                                    <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 26, lineHeight: 30, alignSelf: 'center'}}>{coinB.unit}</Text>
                                </View>
                                <View>
                                    <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 14, lineHeight: 30, alignSelf: 'center'}}>({coinB.name})</Text>
                                </View>
                                <View style={{marginTop: 10, padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#ccc'}}>
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{fontFamily: 'GothamMedium', fontSize: 14, color: 'grey'}}>Exchange Rate: </Text>
                                        <Text style={{fontFamily: 'GothamMedium', fontSize: 14, color: '#37E39F', marginBottom: 5}}>{coinB.value}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontFamily: 'GothamMedium', fontSize: 14, color: 'grey'}}>Type: </Text>
                                        <Text style={{fontFamily: 'GothamMedium', fontSize: 14, color: '#37E39F'}}>{coinB.type}</Text>
                                    </View>
                                </View>
                            </View>          
                        </View>

                    </View>
                        
                    )}
                    
                    {/* Compare Button */}
                    <TouchableOpacity style={styles.searchButton} 
                        onPress = {() => {
                            setSelectMode(true);
                            //console.log(exchangeData[0].length);
                        }}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: -5}}>
                            <Text style={styles.searchButtonText}>
                                Compare With
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {selectMode==true ? renderAllCoin() : null}

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchButton: {
        backgroundColor: "#37E39F",
        marginTop: 5,
        marginHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 8
    },
    searchButtonText: {
        marginTop:0, 
        lineHeight: 22, 
        color: 'white', 
        textAlign: "center",
        fontFamily: 'GothamMedium'
    },
})
