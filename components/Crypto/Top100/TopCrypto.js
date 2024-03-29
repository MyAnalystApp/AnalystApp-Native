import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated, ImageBackground, FlatList, LogBox, TextInput } from 'react-native';
import {VictoryScatter, VictoryLine, VictoryChart, VictoryAxis, VictoryBar} from "victory-native";
import VictoryCustomTheme from '../VictoryCustomTheme';
import SearchBar from './SearchBar';

const { width, height } = Dimensions.get("window");

export default function TopCrypto({sendDataToParent}) {

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        );
    }


    // allCrypto  cryptoInfo
    const[viewMode, setViewMode] = useState("allCrypto");

    const [topCurrency, setTopCurrency] = useState(null);

    {/* Related to SearchBar */}
    const [query, setQuery] = useState('');
    const [names, setNames] = useState(null);
    const [count, setCount] = useState(1);
    const [filteredCurrency, setFilteredCurrency] = useState(null);

    const [cryptoInfo, setCryptoInfo] = useState(null);
    const [cryptoImg, setCryptoImg] = useState(null);

    const [chartData1, setChartData1] = useState(null);
    const [chartData7, setChartData7] = useState(null);
    const [chartData30, setChartData30] = useState(null);
    const [chartData365, setChartData365] = useState(null);
    const [chart1, setChart1] = useState(null);
    const [chart7, setChart7] = useState(null);
    const [chart30, setChart30] = useState(null);
    const [chart365, setChart365] = useState(null);
    const [chartMode, setChartMode] = useState("1");
    const [displayChart, setDisplayChart] = useState(false);

    const fetchTopCurrency = () => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res=>res.json())
        .then(result_coin=>{
            setTopCurrency(result_coin);
            //console.log(JSON.stringify(topCurrency,null,4));
        })
        .catch((e) => {
            console.log("Error in TopCrypto ke fetch mai !! \n"+e);
        })
    }

    useEffect(()=>{
        fetchTopCurrency(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[])


    // Bug => Feature

    const scrollX = new Animated.Value(0);
    const numberOfCharts =[1];
    
    let data1 = [];
    let data7 = [];
    let data30 = [];
    let data365 = [];

    function cryptoId(val, img){

        fetch(`https://api.coingecko.com/api/v3/coins/${val}`)
        .then(res=>res.json())
        .then(result_coin=>{
            setCryptoInfo(result_coin);
        })

        setViewMode("cryptoInfo")
        setCryptoImg(img)


        fetch(`https://api.coingecko.com/api/v3/coins/${val}/market_chart?vs_currency=inr&days=1`)
        .then(res=>res.json())
        .then(result_coin=>{
            setChartData1(result_coin.prices);
        })

        fetch(`https://api.coingecko.com/api/v3/coins/${val}/market_chart?vs_currency=inr&days=7`)
        .then(res=>res.json())
        .then(result_coin=>{
            setChartData7(result_coin.prices);
        })


        fetch(`https://api.coingecko.com/api/v3/coins/${val}/market_chart?vs_currency=inr&days=30`)
        .then(res=>res.json())
        .then(result_coin=>{
            setChartData30(result_coin.prices);
        })

        fetch(`https://api.coingecko.com/api/v3/coins/${val}/market_chart?vs_currency=inr&days=365`)
        .then(res=>res.json())
        .then(result_coin=>{
            setChartData365(result_coin.prices);
        })



        let index1 = 0 ;
        chartData1 == null ? "wait" : (
            chartData1.map(coin =>{
                index1++;
                if(index1 % 5 ==0){
                    data1.push({x : coin[0], y: coin[1]})
                }
            })
        )

        let index7 = 0 ;
        chartData7 == null ? "wait" : (
            chartData7.map(coin =>{
                index7++;
                if(index7 % 5 ==0){
                    data7.push({x : coin[0], y: coin[1]})
                }
            })
        )

        let index30 = 0 ;
        chartData30 == null ? "wait" : (
            chartData30.map(coin =>{
                index30++;
                if(index30 % 5 ==0){
                    data30.push({x : coin[0], y: coin[1]})
                }
            })
        )

        let index365 = 0 ;
        chartData365 == null ? "wait" : (
            chartData365.map(coin =>{
                index365++;
                if(index365 % 5 ==0){
                    data365.push({x : coin[0], y: coin[1]})
                }
            })
        )

        setChart1(data1);
        setChart7(data7);
        setChart30(data30);
        setChart365(data365);

    }

    function processData() {
        let data = [];
        for(let i=0 ; i<topCurrency.length ; i++) {
            data[i] = topCurrency[i].name;
        }

        setNames(data);
        setCount(2);
    }

    function findMatches(wordToMatch, names) {
		return names.filter(item => {
			const regularExpression = new RegExp(wordToMatch, 'gi');
			return item.match(regularExpression);
		})
	}

    function processFiltered(text) {
        setQuery(text);
        const matchedNames = findMatches(text, names);
        const dummyFiltered = topCurrency.filter(coin => (matchedNames.includes(coin.name)));

        //console.log(dummyFiltered.length);
        setFilteredCurrency(dummyFiltered);
    }

    function renderAllCrypto(){
        return(
            <ScrollView>

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
                                <Text style={{  marginLeft: 0, fontSize: 14, fontFamily: "GothamMedium" , color: "black"}}>Top Crypto</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1,}}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                        </View>
                    </View>
                </View>


                {/* Future is Here!! */}
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
                        // onPress = {() => setViewMode("allCrypto")}
                    >
                        <View style={{flexDirection: 'column'}}>
                            <View style={{ alignItems: 'center'}}>
                                <Image 
                                    source={require('../../../assets/images/block.jpg')}
                                    resizeMode="cover"
                                    style={{
                                        marginBottom: 0,
                                        width: 150,
                                        height: 150,
                                        marginTop: 0
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30, alignSelf: 'center'}}>The Future is here !</Text>
                                <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22, alignSelf: 'center', marginHorizontal: 20, marginTop: 10}}>Blockchain solves every problem of digital money transfer. These cryptocurrencies are made using Blockchain technology which uses special hashing algorithms to make every transaction secure.</Text>
                            </View>

                        </View>

                    </View>
                </View>

                <SearchBar onChangeTextHandler={processFiltered} />

                {((topCurrency) && (count==1)) ? processData() : null}

                {(query==='') ? (

                <View style={{marginTop: 10}}>
                
                    { topCurrency == null ? (
                        <View style={{alignItems: 'center', marginTop: width/2}}>
                            <Text style={{fontSize: 20, fontFamily: "GothamMedium" , color: "black"}}>Loading...</Text>
                        </View>
                    )  : (

                        topCurrency.map(coin =>{
                            return(
                                <TouchableOpacity 
                                    key={coin.id}
                                    style={{  
                                        justifyContent: 'center', 
                                        paddingHorizontal: 12, 
                                        paddingVertical: 4
                                    }}
                                    onPress={() => cryptoId(coin.id,coin.image)}
                                >
                                    <View style={{ flexDirection: 'row', height: 75, backgroundColor: "white", borderRadius: 8 }}>
                                        <View style={{ flex: 1, borderRadius: 6,justifyContent: 'center'}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginLeft: 10
                                                }}>
                                                <Image 
                                                    source={{ uri: `${coin.image}`}}
                                                    resizeMode="cover"
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                />
                                                </View>
                                                <View style={{marginLeft: 8, justifyContent: 'center'}}>
                                                    <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30}}>{coin.name}</Text>
                                                    <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22}}>{coin.symbol}</Text>
                                                </View>
                                        </View>
                                    </View>

                                    <View
                                        style={{ 
                                            flex: 1,
                                            marginHorizontal: -20,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                                alignItems: 'center',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                            }}
                                        >   
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{ 
                                                    marginLeft: 0, 
                                                    fontSize: 14, 
                                                    fontFamily: 'GothamMedium', 
                                                    lineHeight: 22, 
                                                    color: "grey"
                                                }}>Per Change: </Text>
                                                <Text style={{ 
                                                    marginLeft: 0, 
                                                    fontSize: 14, 
                                                    fontFamily: 'GothamMedium', 
                                                    lineHeight: 22, 
                                                    color: (coin.market_cap_change_percentage_24h).toString().charAt(0) == "-" ? "tomato" : "#37E39F", 
                                                }}>{(coin.market_cap_change_percentage_24h).toFixed(2)}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{ marginLeft: 0, fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "grey" }}>Price: </Text>
                                                <Text style={{ 
                                                    marginLeft: 0, 
                                                    fontSize: 14, 
                                                    fontFamily: 'GothamMedium', 
                                                    lineHeight: 22, 
                                                    color: "black"
                                                }}
                                            >{coin.current_price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            )
                        })
                    )} 
                    
                </View>

                ) : (   
                
                <View style={{marginTop: 10}}>
            
                    { filteredCurrency == null || filteredCurrency.length==0 ? (
                        <View style={{alignItems: 'center', marginTop: width/2}}>
                            <Text style={{fontSize: 20, fontFamily: "GothamMedium" , color: "black"}}>Not Found, try another</Text>
                        </View>
                    )  : (

                        filteredCurrency.map(coin =>{
                            return(
                                <TouchableOpacity 
                                    key={coin.id}
                                    style={{  
                                        justifyContent: 'center', 
                                        paddingHorizontal: 12, 
                                        paddingVertical: 4
                                    }}
                                    onPress={() => cryptoId(coin.id,coin.image)}
                                >
                                    <View style={{ flexDirection: 'row', height: 75, backgroundColor: "white", borderRadius: 8 }}>
                                        <View style={{ flex: 1, borderRadius: 6,justifyContent: 'center'}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginLeft: 10
                                                }}>
                                                <Image 
                                                    source={{ uri: `${coin.image}`}}
                                                    resizeMode="cover"
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                />
                                                </View>
                                                <View style={{marginLeft: 8, justifyContent: 'center'}}>
                                                    <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30}}>{coin.name}</Text>
                                                    <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22}}>{coin.symbol}</Text>
                                                </View>
                                        </View>
                                    </View>

                                    <View
                                        style={{ 
                                            flex: 1,
                                            marginHorizontal: -20,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                                alignItems: 'center',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                            }}
                                        >   
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{ 
                                                    marginLeft: 0, 
                                                    fontSize: 14, 
                                                    fontFamily: 'GothamMedium', 
                                                    lineHeight: 22, 
                                                    color: "grey"
                                                }}>Per Change: </Text>
                                                <Text style={{ 
                                                    marginLeft: 0, 
                                                    fontSize: 14, 
                                                    fontFamily: 'GothamMedium', 
                                                    lineHeight: 22, 
                                                    color: (coin.market_cap_change_percentage_24h).toString().charAt(0) == "-" ? "tomato" : "#37E39F", 
                                                }}>{(coin.market_cap_change_percentage_24h).toFixed(2)}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{ marginLeft: 0, fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "grey" }}>Price: </Text>
                                                <Text style={{ 
                                                    marginLeft: 0, 
                                                    fontSize: 14, 
                                                    fontFamily: 'GothamMedium', 
                                                    lineHeight: 22, 
                                                    color: "black"
                                                }}
                                            >{coin.current_price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            )
                        })
                    )} 
                    
                </View>
                
                )}

            </ScrollView>
        )
    }

    function renderCryptoInfo(){

        function back() {
            setViewMode("allCrypto")
            setDisplayChart(false)
            setChartData1(null)
            setChartData7(null)
            setChartData30(null)
            setChartData365(null)
            setChart1(null)
            setChart7(null)
            setChart30(null)
            setChart365(null)
            setCryptoInfo(null)
            setCryptoImg(null)
            data1 = []
            data7 =[]
            data30 =[]
            data365 =[]
        }

        function enableDisplayChart(){

            let index1 = 0 ;
            chartData1 == null ? "wait" : (
                chartData1.map(coin =>{
                    index1++;
                    if(index1 % 5 ==0){
                        data1.push({x : coin[0], y: coin[1]})
                    }
                })
            )

            let index7 = 0 ;
            chartData7 == null ? "wait" : (
                chartData7.map(coin =>{
                    index7++;
                    if(index7 % 5 ==0){
                        data7.push({x : coin[0], y: coin[1]})
                    }
                })
            )

            let index30 = 0 ;
            chartData30 == null ? "wait" : (
                chartData30.map(coin =>{
                    index30++;
                    if(index30 % 5 ==0){
                        data30.push({x : coin[0], y: coin[1]})
                    }
                })
            )
            
            let index365 = 0 ;
            chartData365 == null ? "wait" : (
                chartData365.map(coin =>{
                    index365++;
                    if(index365 % 5 ==0){
                        data365.push({x : coin[0], y: coin[1]})
                    }
                })
            )


            setChart1(data1);
            setChart7(data7);
            setChart30(data30);
            setChart365(data365);
    
            setDisplayChart(true)
        }

        function loadChart1(){

            let index1 = 0 ;
            chartData1 == null ? "wait" : (
                chartData1.map(coin =>{
                    index1++;
                    if(index1 % 5 ==0){
                        data1.push({x : coin[0], y: coin[1]})
                    }
                })
            )
            
            setChart1(data1);
        }

        return(
            <View>

                {cryptoInfo==null ? (
                    <View style={{alignItems: 'center', marginTop: width/1.25}}>
                        <Text style={{fontSize: 20, fontFamily: "GothamMedium" , color: "black"}}>Loading...</Text>
                    </View>
                ) : (

                    <View>

                        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white",}}>
                            <View style={{ flexDirection: 'row', marginTop: 10 , marginBottom: 10}}>
                                <TouchableOpacity   style={{ flex: 1,}} 
                                        onPress={() => back()}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../../../assets/icons/back_arrow.png')} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flex: 1}}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{  marginLeft: 0, fontSize: 16, fontFamily: "GothamBold" , color: "black"}}>{cryptoInfo.name}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1,}}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                                </View>
                            </View>
                        </View>


                        <View style={{ backgroundColor: 'white'}}>
                            <View 
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 24,
                                    paddingHorizontal: 24
                                }}
                            >
                    
                                <View style={{flex:1}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{
                                            padding: 10,
                                            borderWidth: 1,
                                            borderColor: "#E7E7E9",
                                            borderRadius: 10
                                        }}>
                                            <Image 
                                                source={{ uri: `${cryptoImg}`}}
                                                style={{
                                                    width: 35,
                                                    height: 35,
                                                    alignSelf: 'center'
                                                }}
                                            />
                                        </View>
                                        <View style={{marginLeft: 16, justifyContent: 'center'}}>
                                            <Text style={{fontFamily: "GothamLight", fontSize: 16, lineHeight: 22 }}>Current {(cryptoInfo.symbol).toUpperCase()} Buy Price</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{color: "grey", fontFamily: "GothamBold", fontSize: 24, marginRight: 10,}}>₹{cryptoInfo.market_data.current_price.inr}</Text>
                                                <Text style={{
                                                    fontFamily: "GothamBold", 
                                                    color:  (cryptoInfo.market_data.price_change_percentage_24h_in_currency.inr).toString().charAt(0) == "-" ? "tomato" : "#37E39F", 
                                                    fontSize: 16, 
                                                    alignSelf: 'center', 
                                                    marginTop: 5
                                                }}>{cryptoInfo.market_data.price_change_percentage_24h_in_currency.inr}%</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </View>

                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <View style={{ flexDirection: 'row', height: 55, backgroundColor: "white", borderRadius: 8 }}>

                                    <View
                                        style={{ 
                                            flex: 1, 
                                            margin: 5,
                                            borderRadius: 6,
                                        }}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>1D Highest</Text>
                                            <Text style={{  marginLeft: 6, fontSize: 16,fontFamily: 'GothamBold', lineHeight: 22, color: "black"}}>₹{cryptoInfo.market_data.high_24h.inr}</Text>
                                        </View>
                                    </View>

                                    <LineDivider />

                                    <View
                                        style={{ 
                                            flex: 1,
                                            margin: 5,
                                            borderRadius: 8,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "grey" }}>1D Lowest</Text>
                                            <Text style={{ marginLeft: 6, fontSize: 16, fontFamily: 'GothamBold', lineHeight: 22, color: "black" }}>₹{cryptoInfo.market_data.low_24h.inr}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                                        
                            {displayChart == false ? (
                                <View style={{marginBottom: 20}}>
                                    <TouchableOpacity style={styles.searchButton} 
                                        onPress={() => enableDisplayChart()}
                                    >
                                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: -5}}>
                                            <Text style={styles.searchButtonText}>
                                                Load Chart
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={{marginBottom: 20}}>
                                    <View>
                                        {chartData1 == null ? 
                                            <View style={{flexDirection: 'row', marginBottom: 35, justifyContent: 'center'}}>
                                                <Text style={{color: "grey", fontFamily: 'GothamMedium', fontSize: 14, marginRight: 5}}>Server Error :( </Text>
                                                <TouchableOpacity
                                                    onPress={() => loadChart1()}
                                                >
                                                    <Text style={{color: "#5D2DFD", fontFamily: 'GothamMedium', fontSize: 14, textDecorationLine: 'underline', marginLeft: 5}}> Load Again?</Text>
                                                </TouchableOpacity>
                                            </View>
                                            : (
                                            renderChart()
                                        )}
                                    </View>

                                    <TouchableOpacity style={styles.hideButton} 
                                        onPress={() => setDisplayChart(false)}
                                    >
                                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: -5}}>
                                            <Text style={styles.hideButtonText}>
                                                Hide
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            
                    
                        </View>

                        <View style={{marginTop: 20, backgroundColor: 'white'}}>

                            <Text style={{fontFamily: "GothamBold", fontSize: 20, paddingLeft: 14, marginTop: 14, marginBottom: 14}}>About {cryptoInfo.name}</Text>

                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <View style={{ flexDirection: 'row', height: 55, borderRadius: 8 }}>

                                    <View
                                        style={{ 
                                            flex: 1, 
                                            borderRadius: 6,
                                            paddingLeft: 14,
                                        }}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Market Cap</Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{ 
                                            borderRadius: 8,
                                            paddingRight: 14,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>₹ {cryptoInfo.market_data.market_cap.inr}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{borderBottomWidth: 1, borderBottomColor: "#DEDEDE", marginHorizontal: 14}} />

                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <View style={{ flexDirection: 'row', height: 55, borderRadius: 8 }}>

                                    <View
                                        style={{ 
                                            flex: 1, 
                                            borderRadius: 6,
                                            paddingLeft: 14,
                                        }}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Total Volume</Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{ 
                                            borderRadius: 8,
                                            paddingRight: 14,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>₹ {cryptoInfo.market_data.total_volume.inr}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{borderBottomWidth: 1, borderBottomColor: "#DEDEDE", marginHorizontal: 14}} />

                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <View style={{ flexDirection: 'row', height: 55, borderRadius: 8 }}>

                                    <View
                                        style={{ 
                                            flex: 1, 
                                            borderRadius: 6,
                                            paddingLeft: 14,
                                        }}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Price change in 1 day</Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{ 
                                            borderRadius: 8,
                                            paddingRight: 14,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >   
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>₹ {cryptoInfo.market_data.price_change_24h_in_currency.inr}, </Text>
                                                <Text style={{ 
                                                    fontSize: 14, 
                                                    fontFamily: 'GothamMedium', 
                                                    lineHeight: 22, 
                                                    color:  (cryptoInfo.market_data.price_change_percentage_24h_in_currency.inr).toString().charAt(0) == "-" ? "tomato" : "#37E39F", 
                                                }}
                                                >{cryptoInfo.market_data.price_change_percentage_24h_in_currency.inr}%</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{borderBottomWidth: 1, borderBottomColor: "#DEDEDE", marginHorizontal: 14}} />

                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <View style={{ flexDirection: 'row', height: 55, borderRadius: 8 }}>

                                    <View
                                        style={{ 
                                            flex: 1, 
                                            borderRadius: 6,
                                            paddingLeft: 14,
                                        }}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Hashing Algorithm</Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{ 
                                            borderRadius: 8,
                                            paddingRight: 14,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{cryptoInfo.hashing_algorithm}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{borderBottomWidth: 1, borderBottomColor: "#DEDEDE", marginHorizontal: 14}} />

                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <View style={{ flexDirection: 'row', height: 55, borderRadius: 8 }}>

                                    <View
                                        style={{ 
                                            flex: 1, 
                                            borderRadius: 6,
                                            paddingLeft: 14,
                                        }}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Block Time</Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{ 
                                            borderRadius: 8,
                                            paddingRight: 14,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{cryptoInfo.block_time_in_minutes} min</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{borderBottomWidth: 1, borderBottomColor: "#DEDEDE", marginHorizontal: 14}} />

                            <View style={{marginBottom: 20, paddingHorizontal: 14, marginTop: 30}}>
                                <Text style={{fontFamily: "GothamBold", fontSize: 20,  marginBottom: 14}}>What is {cryptoInfo.name}?</Text>
                                <Text style={{fontFamily: "GothamMedium", fontSize: 12, color: "grey", lineHeight: 16}}>{cryptoInfo.description.en}</Text>
                            </View>
                        </View>

                    </View>
                    
                )}
                

            </View>
        )
    }


    function renderChart(){

        function chartDay1(){
            let index1 = 0 ;
            chartData1 == null ? "wait" : (
                chartData1.map(coin =>{
                    index1++;
                    if(index1 % 5 ==0){
                        data1.push({x : coin[0], y: coin[1]})
                    }
                })
            )
            
            setChart1(data1);
            setChartMode("1");
        }

        function chartDay7(){
            let index7 = 0 ;
            chartData7 == null ? "wait" : (
                chartData7.map(coin =>{
                    index7++;
                    if(index7 % 5 ==0){
                        data7.push({x : coin[0], y: coin[1]})
                    }
                })
            )
            
            setChart7(data7);
            setChartMode("7");
        }

        function chartDay30(){
            let index30 = 0 ;
            chartData30 == null ? "wait" : (
                chartData30.map(coin =>{
                    index30++;
                    if(index30 % 5 ==0){
                        data30.push({x : coin[0], y: coin[1]})
                    }
                })
            )
            
            setChart30(data30);
            setChartMode("30");
        }

        function chartDay365(){
            let index365 = 0 ;
            chartData365 == null ? "wait" : (
                chartData365.map(coin =>{
                    index365++;
                    if(index365 % 5 ==0){
                        data365.push({x : coin[0], y: coin[1]})
                    }
                })
            )
            
            setChart365(data365);
            setChartMode("365");
        }

        return(
            <View>

                <View style={{marginTop: -25, justifyContent: 'center', alignItems: 'center'}}>
                    <VictoryChart
                        theme={VictoryCustomTheme}
                        height={325}
                        width={width + 50}
                        style={{
                        }}
                        
                    >
                        <VictoryLine
                            interpolation="natural"
                            style={{
                                data: {
                                    stroke: "#5D2DFD"
                                },
                                parent: {
                                    border: "1px solid #ccc"
                                }
                            }}

                            data={
                                    chartMode === "1" ? chart1 :
                                    chartMode === "7" ? chart7 :
                                    chartMode === "30" ? chart30 :
                                    chart365
                                }
                        />

                        <VictoryAxis 
                            style={{
                                tickLabels: { fill:"transparent"}
                            }}
                        />
                        <VictoryAxis 
                            dependentAxis
                            style={{
                                tickLabels: { fill:"transparent"} ,
                                
                                grid: {
                                    stroke: "#ccc"
                                }
                            }}
                        />

                    </VictoryChart>

                </View>
                
                <View style={{ flex: 1, justifyContent: 'center', marginTop: -20, marginBottom: 30}}>
                    <View style={{ flexDirection: 'row', height: 55, borderRadius: 8, paddingHorizontal: 14 }}>

                        <View
                            style={{ 
                                flex: 1, 
                                borderRadius: 6,
                                paddingHorizontal: 8
                            }}
                        >
                            <TouchableOpacity style={{
                                backgroundColor: chartMode === "1" ? "#2E323D" : "white",
                                marginTop: 5,
                                marginHorizontal: 8,
                                paddingVertical: 10,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#ccc",
                            }}
                                onPress={() => chartDay1()}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: -5}}>
                                    <Text style={{
                                        lineHeight: 22, 
                                        color: chartMode === "1" ? "white" : "grey",
                                        textAlign: "center",
                                        fontFamily: 'GothamMedium',
                                        fontSize: 14
                                    }}>
                                        1 D
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{ 
                                flex: 1, 
                                borderRadius: 6,
                                paddingHorizontal: 8
                            }}
                        >
                            <TouchableOpacity style={{
                                backgroundColor: chartMode === "7" ? "#2E323D" : "white",
                                marginTop: 5,
                                marginHorizontal: 8,
                                paddingVertical: 10,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor:"#ccc",
                            }} 
                            onPress={() => chartDay7()}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: -5}}>
                                    <Text style={{
                                        lineHeight: 22, 
                                        color: chartMode === "7" ? "white" : "grey",
                                        textAlign: "center",
                                        fontFamily: 'GothamMedium',
                                        fontSize: 14
                                    }}>
                                        1 W
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{ 
                                flex: 1, 
                                borderRadius: 6,
                                paddingHorizontal: 8
                            }}
                        >
                            <TouchableOpacity style={{
                                backgroundColor: chartMode === "30" ? "#2E323D" : "white",
                                marginTop: 5,
                                marginHorizontal: 8,
                                paddingVertical: 10,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor:"#ccc",
                            }} 
                            onPress={() => chartDay30()}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: -5}}>
                                    <Text style={{
                                        lineHeight: 22, 
                                        color: chartMode === "30" ? "white" : "grey",
                                        textAlign: "center",
                                        fontFamily: 'GothamMedium',
                                        fontSize: 14
                                    }}>
                                        1 M
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{ 
                                flex: 1, 
                                borderRadius: 6,
                                paddingHorizontal: 8
                            }}
                        >
                            <TouchableOpacity style={{
                                backgroundColor: chartMode === "365" ? "#2E323D" : "white",
                                marginTop: 5,
                                marginHorizontal: 8,
                                paddingVertical: 10,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor:"#ccc",
                            }} 
                            onPress={() => chartDay365()}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: -5}}>
                                    <Text style={{
                                        lineHeight: 22, 
                                        color: chartMode === "365" ? "white" : "grey",
                                        textAlign: "center",
                                        fontFamily: 'GothamMedium',
                                        fontSize: 14
                                    }}>
                                        1 Yr
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                

            </View>
        )
    }

    return (
        <View>
            {viewMode==="allCrypto" && renderAllCrypto()}
            {viewMode==="cryptoInfo" && renderCryptoInfo()}
        </View>
    );
}


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

    hideButton: {
        backgroundColor: "white",
        marginTop: -20,
        marginHorizontal: 28,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    
    hideButtonText: {
        lineHeight: 22, 
        color: "grey", 
        textAlign: "center",
        fontFamily: 'GothamMedium',
        fontSize: 16
    },

    chartButton: {
        backgroundColor: "white",
        marginTop: 5,
        marginHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    chartButtonText: {
        lineHeight: 22, 
        color: "grey", 
        textAlign: "center",
        fontFamily: 'GothamMedium',
        fontSize: 16
    },
})
