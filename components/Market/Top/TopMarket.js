import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated, ImageBackground, FlatList, LogBox, TextInput } from 'react-native';
import {VictoryScatter, VictoryLine, VictoryChart, VictoryAxis, VictoryBar} from "victory-native";
import VictoryCustomTheme from '../VictoryCustomTheme';
import {key} from '../../../StockApiKey';

const { width } = Dimensions.get("window");

export default function TopMarket({sendDataToParent}) {

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        );
    }

    const allCompanies = [

        // Large-Cap
        {"name": "State Bank of India", "symbol": "SBIN.NS", "type": "large-cap"},
        {"name": "Axis Bank Limited", "symbol": "AXISBANK.BO", "type": "large-cap"},
        {"name": "Indian Oil Corporation Limited", "symbol": "IOC.BO", "type": "large-cap"},
        {"name": "NMDC Limited", "symbol": "NMDC.BO", "type": "large-cap"},
        {"name": "The Tata Power Company Limited", "symbol": "TATAPOWER.NS", "type": "large-cap"},
        {"name": "Gas Authority of India Limited", "symbol": "GAIL.NS", "type": "large-cap"},
        {"name": "Steel Authority of India Limited", "symbol": "SAIL.NS", "type": "large-cap"},
        {"name": "HDFC Bank Limited", "symbol": "HDFCBANK.BO", "type": "large-cap"},
        {"name": "Oil and Natural Gas Corporation Limited", "symbol": "ONGC.NS", "type": "large-cap"},
        {"name": "Infosys Limited", "symbol": "INFY.BO", "type": "large-cap"},
        {"name": "Wipro Limited", "symbol": "WIPRO.BO", "type": "large-cap"},
        {"name": "Bharat Heavy Electricals Limited", "symbol": "BHEL.NS", "type": "large-cap"},

        // Mid-Cap
        {"name": "Prime Securities", "symbol": "PRIMESECU.NS", "type": "mid-cap"},
        {"name": "Indian Energy Ex", "symbol": "IEX.NS", "type": "mid-cap"},
        {"name": "Sh. Digvijay Cem", "symbol": "SHREDIGCEM.BO", "type": "mid-cap"},
        {"name": "Nicco Parks", "symbol": "NICCOPAR.BO", "type": "mid-cap"},
        {"name": "Vinyl Chemicals", "symbol": "VINYLINDIA.NS", "type": "mid-cap"},
        {"name": "United Drilling", "symbol": "UNIDT.BO", "type": "mid-cap"},
        {"name": "Auro Laboratories Limited", "symbol": "AUROLAB.BO", "type": "mid-cap"},
        {"name": "The Federal Bank Limited", "symbol": "FEDERALBNK.NS", "type": "mid-cap"},
        {"name": "Vodafone Idea Limited", "symbol": "IDEA.NS", "type": "mid-cap"},
        {"name": "Alok Industries Limited", "symbol": "ALOKTEXT.BO", "type": "mid-cap"},
        {"name": "Bank of Baroda", "symbol": "BANKBARODA.BO", "type": "mid-cap"},
        {"name": "Dish TV India Limited", "symbol": "DISHTV.BO", "type": "mid-cap"},
        {"name": "Vedanta Limited", "symbol": "VEDL.BO", "type": "mid-cap"},

        // Small-Cap
        {"name": "Resonance Speci.", "symbol": "RESONANCE.BO", "type": "small-cap"},
        {"name": "Tyche Industries", "symbol": "TYCHE.BO", "type": "small-cap"},
        {"name": "Sanmit Infra", "symbol": "SANINFRA.BO", "type": "small-cap"},
        {"name": "Coral India Fin.", "symbol": "CORALFINAC.BO", "type": "small-cap"},
        {"name": "Alembic", "symbol": "ALEMBICLTD.NS", "type": "small-cap"},
        {"name": "Atlas Jewellery", "symbol": "AJIL.BO", "type": "small-cap"},
        {"name": "Mercantile Vent.", "symbol": "MERCANTILE.BO", "type": "small-cap"},
        {"name": "Lotus Eye Hospit", "symbol": "LOTUSEYE.NS", "type": "small-cap"},
        {"name": "Oswal Agro Mills", "symbol": "OSWALAGRO.BO", "type": "small-cap"},
        {"name": "PTC India Limited", "symbol": "PTC.NS", "type": "small-cap"},
        {"name": "Pressman Advertising Limited", "symbol": "PRESSMN.NS", "type": "small-cap"},
        {"name": "Ador Fontech Limited", "symbol": "ADORFO.BO", "type": "small-cap"},
        {"name": "Bhagyanagar Properties Limited", "symbol": "BHAGYAPROP.BO", "type": "small-cap"},
        {"name": "The Andhra Petrochemicals Limited", "symbol": "ANDHRAPET.BO", "type": "small-cap"},
        {"name": "Manali Petrochemicals Limited", "symbol": "MANALIPETC.BO", "type": "small-cap"},
        {"name": "Kriti Industries (India) Limited", "symbol": "KRITIIND.BO", "type": "small-cap"},

    ]


    const [viewMode, setViewMode] = useState("topMarket");
    const [stockInfo, setStockInfo] = useState(null);

    const [chartInfo, setChartInfo] = useState(null);
    const [chartData, setChartData] = useState(null);

    const [displayChart, setDisplayChart] = useState(false);

    let dataX = [];
    let dataY = [];
    let data = [];

    function fetchStockInfo(val){

        fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=${val}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": key,
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(res => {
            setStockInfo(res.quoteResponse.result[0]);
        })
        .catch(err => {
            console.error(err);
        });

        fetchStockChart(val);

    }

    function fetchStockChart(val) {

        fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=${val}&range=1d&region=IN`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": key,
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(res => {
            setChartInfo(res.chart);
            // console.log(res.chart);
        })
        .catch(err => {
            console.error(err);
        });

        chartInfo == null ? "skip" : (
            fillVictoryData()
        )
    }

    function fillVictoryData(){

        chartInfo.result[0].timestamp.map(info => {
            dataX.push(info)
            // console.log(info)
        }),

        chartInfo.result[0].indicators.quote[0].open.map(info => {
            dataY.push(info)
            // console.log(info)
        });

        // let i = 0;

        for(let i = 0; i<dataX.length; i++){
            if(dataY[i] != null){
                data.push({x : dataX[i], y: dataY[i]})
            }
        }

        setChartData(data);

    }


    
    function renderStockInfo(){

        function back(){
            setViewMode("topMarket");
            setStockInfo(null)
            setChartData(null)
            setChartInfo(null)
            data = []
            dataX = []
            dataY = []
        }

        function displayChartInfo(val) {
            fetchStockChart(val);
            setDisplayChart(true);
        }

        return(
            <ScrollView>

            {stockInfo==null ? (
                <View style={{alignItems: 'center', marginTop: width/1.25}}>
                    <Text style={{fontSize: 20, fontFamily: "GothamMedium" , color: "black"}}>Loading...</Text>
                </View>
            ) : (

                <View style={{backgroundColor: 'white'}}>
                    {console.log(stockInfo)}
                    {/* Header */}
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
                                    <Text style={{  marginLeft: 0, fontSize: 14, fontFamily: "GothamBold" , color: "black"}}>{stockInfo.symbol}</Text>
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
                                paddingHorizontal: 14
                            }}
                        >
                
                            <View style={{flex:1}}>
                                <View style={{flexDirection: 'row'}}>
                                    
                                    <View style={{marginLeft: 16, justifyContent: 'center'}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{fontFamily: "GothamMedium", fontSize: 16, lineHeight: 22 }}>{(stockInfo.symbol).toUpperCase()}'s </Text>
                                            <Text style={{fontFamily: "GothamLight", fontSize: 16, lineHeight: 22 }}>current stock price.</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{color: "grey", fontFamily: "GothamBold", fontSize: 24, marginRight: 10,}}>₹{stockInfo.regularMarketPrice}</Text>
                                            <Text style={{
                                                fontFamily: "GothamBold", 
                                                color:  (stockInfo.regularMarketChange<0) ? "tomato" : "#37E39F", 
                                                fontSize: 16, 
                                                alignSelf: 'center', 
                                                marginTop: 5
                                            }}>{stockInfo.regularMarketChange > 0 ? "+" : ""}{stockInfo.regularMarketChange.toFixed(2)} ({stockInfo.regularMarketChangePercent.toFixed(2)}%)</Text>
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
                                        <Text style={{  marginLeft: 6, fontSize: 16,fontFamily: 'GothamBold', lineHeight: 22, color: "black"}}>₹{stockInfo.regularMarketDayHigh}</Text>
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
                                        <Text style={{ marginLeft: 6, fontSize: 16, fontFamily: 'GothamBold', lineHeight: 22, color: "black" }}>₹{stockInfo.regularMarketDayLow}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> 

                    {chartData == null || displayChart == false ? (
                        <View style={{marginBottom: 0}}>
                            <TouchableOpacity style={styles.searchButton} 
                                onPress = {() => displayChartInfo(stockInfo.symbol)}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: -5}}>
                                    <Text style={styles.searchButtonText}>
                                        Load Chart
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            
                            {renderChart()}
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

                    <View style={{marginTop: 20, backgroundColor: 'white'}}>

                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontFamily: "GothamBold", fontSize: 18, paddingLeft: 14, marginTop: 14, marginBottom: 14, color: 'black'}}>About </Text>
                                <Text style={{alignSelf: 'center' ,fontFamily: "GothamBold", fontSize: 16, marginTop: 14, marginBottom: 14, color: 'grey'}}>{stockInfo.shortName}</Text>
                            </View>

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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>₹ {stockInfo.marketCap}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Avg. Volume 10 D</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>₹ {stockInfo.averageDailyVolume10Day}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Avg. Volume 3 M</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>₹ {stockInfo.averageDailyVolume3Month}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Exchange</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.exchange}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>50 Day Avg</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyDayAverage}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>50 Day Avg change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyDayAverageChange}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>50 Day Avg % change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyDayAverageChangePercent}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>52 Week High</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyTwoWeekHigh}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>52 Week High Change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyTwoWeekHighChange}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>52 Week High % Change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyTwoWeekHighChangePercent}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>52 Week Low</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyTwoWeekLow}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>52 Week Low Change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyTwoWeekLowChange}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>52 Week Low % Change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyTwoWeekLowChangePercent}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>52 Week Range</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.fiftyTwoWeekRange}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Reg Market Change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.regularMarketChange}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Reg Market % Change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.regularMarketChangePercent}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Reg Market Range</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.regularMarketDayRange}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Reg Market Open</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.regularMarketOpen}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Reg Market Close</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.regularMarketPreviousClose}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Reg Market Price</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.regularMarketPrice}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Reg Market Volume</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.regularMarketVolume}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Target Price High</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.targetPriceHigh}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Target Price Low</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.targetPriceLow}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Target Price Mean</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.targetPriceMean}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Target Price Median</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.targetPriceMedian}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>200 Day Avg</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.twoHundredDayAverage}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>200 Day Avg Change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.twoHundredDayAverageChange}</Text>
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
                                            <Text style={{ fontSize: 14,fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>200 Day Avg % Change</Text>
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
                                            <Text style={{ fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>{stockInfo.twoHundredDayAverageChangePercent}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>


                </View> //
            )}         
        </ScrollView>   //  
        )
    }

    function renderChart(){
        return(

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

                        data={chartData}
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
        )
    }

    function renderTopMarket(){

        function companyInfo(val){

            setViewMode("companyInfo");
            fetchStockInfo(val);

        }

        return(
            <View style={{paddingBottom: 10}}>

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white",}}>
                <View style={{ flexDirection: 'row', marginTop: 10 , marginBottom: 10}}>
                    <TouchableOpacity   style={{ flex: 1,}} 
                            onPress = {() => sendDataToParent("home")}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../../../assets/icons/back_arrow.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 14, fontFamily: "GothamMedium" , color: "black"}}>Top Market</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
                </View>
            </View>

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
                                source={require('../../../assets/images/all-stock.jpeg')}
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
                            <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30, alignSelf: 'center'}}>Top Market's Info</Text>
                            <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22, alignSelf: 'center', marginHorizontal: 20, marginTop: 10}}>We are rendering top market companies identified by our ML algorithms so that you can get idea how to invest easily in various sectors like Small Cap, Mid Cap and Large cap companies.</Text>
                        </View>

                    </View>

                </View>
            </View>

            <View style={styles.container}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Search"
                />
            </View>

            
            {allCompanies.map(company => {
                return(
                    <View key={company.symbol}>
                        <TouchableOpacity 
                            style={{  
                                justifyContent: 'center', 
                                paddingHorizontal: 14, 
                                paddingVertical: 4
                            }}
                            onPress = {() => companyInfo(company.symbol)}
                        >
                            <View style={{ flexDirection: 'row', height: 65, backgroundColor: "white", borderRadius: 8 }}>
                                <View style={{ flex: 1, borderRadius: 6,justifyContent: 'center'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{marginLeft: 14}}>
                                            <Text style={{color:"black", fontFamily: "GothamMedium", fontSize: 14, lineHeight: 22}}>{company.name}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginHorizontal: 10,borderRadius: 8,justifyContent: 'center',alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',flexDirection: 'column'}}>   
                                        <View style={{flexDirection: 'column'}}>
                                            <View>
                                                <Text style={{textAlign: 'center', color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22}}>{company.symbol}</Text>
                                            </View>

                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{marginLeft: 0, fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Type: </Text>
                                                <Text style={{ 
                                                    marginLeft: 0, 
                                                    fontSize: 14, 
                                                    fontFamily: 'GothamMedium', 
                                                    lineHeight: 22, 
                                                    color: company.type === "large-cap" ? "#37E39F" : company.type === "mid-cap" ? "#FC6D3F" : company.type === "small-cap" ? "#E02B55" : "grey"
                                                }}>{company.type}</Text>
                                            </View>
                                            
                                        </View>
                                    </View>
                                </View>

                            </View>

                        </TouchableOpacity>
                    </View>
                )
            })}
            
        </View>
        )
    }

    return (
        <View>
            {viewMode === "topMarket" && renderTopMarket()}
            {viewMode === "companyInfo" && renderStockInfo()}
        </View>
    );
}


const styles = StyleSheet.create({
    textInput : {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#37E39F",
        borderRadius: 8,
        padding: 10,
        marginTop: 4,
        marginBottom: 4,
        fontFamily: 'GothamMedium',
        fontSize: 14,
        marginHorizontal: 4,
        paddingLeft: 20,
        color: 'grey'
    },
    container : {
        marginTop: 15, 
        marginHorizontal: 14, 
        backgroundColor: "white", 
        borderRadius: 8,
        marginBottom: 10
    },

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
})
