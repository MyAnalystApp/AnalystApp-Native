import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated, ImageBackground, FlatList, LogBox, TextInput } from 'react-native';
import {VictoryScatter, VictoryLine, VictoryChart, VictoryAxis, VictoryBar} from "victory-native";
import VictoryCustomTheme from '../VictoryCustomTheme';
import {key} from '../../../StockApiKey';

const { width } = Dimensions.get("window");

export default function Sensex({sendDataToParent}) {

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        );
    }

    const [sensexInfo, setSensexInfo] = useState(null);
    const [sensexChart, setSensexChart] = useState(null);
    const [showSensexChart, setShowSensexChart] = useState(false);

    const [viewMode, setViewMode] = useState("stockList");
    const [stockList, setStockList] = useState(null);

    function fetchStockList() {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=INFY.BO%2CTCS.BO%2CRELIANCE.BO%2CICICIBANK.BO%2CHDFCBANK.BO%2CHCLTECH.BO%2CBHARTIARTL.BO%2CINDUSINDBK.BO%2CSBIN.BO%2CLT.BO%2CTECHM.BO%2CAXISBANK.BO%2CITC.BO%2CBAJAJ-AUTO.BO%2CONGC.BO%2CTATASTEEL.BO%2CNTPC.BO%2CM%26M.BO%2CASIANPAINT.BO%2CPOWERGRID.BO%2CBAJAJFINSV.BO%2CTITAN.BO%2CNESTLEIND.BO%2CULTRACEMCO.BO%2CSUNPHARMA.BO%2CBAJFINANCE.BO%2CMARUTI.BO%2CHDFC.BO%2CHINDUNILVR.BO%2CKOTAKBANK.BO", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": key,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }})
        .then(res => res.json())
        .then(res => {
            setStockList(res);
        })
        .catch(err => {
            console.error(err);
        });
    }

    function fetchSensexInfo(){
        fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=%5EBSESN&range=1d&region=IN`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": key,
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(res => {
            setSensexInfo(res.chart);
        })
        .catch(err => {
            console.error(JSON.stringify(err, null, 4));
        });

        (sensexInfo == null || sensexChart != null) ? "skip" : (
            fillSensexChart()
        )
    }

    useEffect(()=>{
        fetchStockList(),
        fetchSensexInfo(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[]);
    

    let dataXS = [];
    let dataYS = [];
    let dataS = [];

    function fillSensexChart(){

        sensexInfo.result[0].timestamp.map(info => {
            dataXS.push(info)
            // console.log(info)
        }),

        sensexInfo.result[0].indicators.quote[0].open.map(info => {
            dataYS.push(info)
            // console.log(info)
        });

        // let i = 0;

        for(let i = 0; i<dataXS.length; i++){
            dataS.push({x : dataXS[i], y: dataYS[i]})
        }

        setSensexChart(dataS)

    }


    function ifSensexChart() {
        sensexChart == null ? (
            fillSensexChart()
        ) : "skip"

        showSensexChart == true ? (
            setShowSensexChart(false)
        ) : (
            setShowSensexChart(true)
        )
    }


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

    function renderAllCompanies() {

        function companyInfo(val){

            setViewMode("stockInfo");
            fetchStockInfo(val);

        }

        return(
            <View>

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
                                <Text style={{  marginLeft: 0, fontSize: 14, fontFamily: "GothamMedium" , color: "black"}}>Sensex</Text>
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
                                    source={{uri: 'http://www.daynews.com/wp-content/uploads/2013/11/BSELogo-DayNews-Business.png'}}
                                    resizeMode="cover"
                                    style={{
                                        marginBottom: 10,
                                        width: 150,
                                        height: 60,
                                        marginTop: 30
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30, alignSelf: 'center'}}>Sensex 30</Text>
                                <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22, alignSelf: 'center', marginHorizontal: 20, marginTop: 10}}>Rendering all sensex 30 companies list. Click on them to view detailed info along with their today's chart.</Text>
                            </View>

                        </View>

                    </View>
                </View>

                {!showSensexChart ? (
                    <TouchableOpacity
                        onPress={() => ifSensexChart()}
                    >
                        <Text>
                            Load again
                        </Text>
                    </TouchableOpacity>
                ) : (

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

                                data={sensexChart}
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

                    <TouchableOpacity
                        onPress={() => ifSensexChart()}
                    >
                        <Text>
                            Hide
                        </Text>
                    </TouchableOpacity>

                </View>
                )}

                <View style={styles.container}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Search"
                    />
                </View>

                {stockList == null ? (
                    <View style={{alignItems: 'center', marginTop: width/2}}>
                        <Text style={{fontSize: 20, fontFamily: "GothamMedium" , color: "black"}}>Loading...</Text>
                    </View>
                ) : (
                    <View>
                        {stockList.quoteResponse.result.map(company => {
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
                                                        <Text style={{color:"black", fontFamily: "GothamMedium", fontSize: 14, lineHeight: 22}}>{company.shortName}</Text>
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
                                                            <Text style={{marginLeft: 0, fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, color: "grey"}}>Exchange: </Text>
                                                            <Text style={{ 
                                                                marginLeft: 0, 
                                                                fontSize: 14, 
                                                                fontFamily: 'GothamMedium', 
                                                                lineHeight: 22, 
                                                                color: "grey"
                                                            }}>{company.exchange}</Text>
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
                )}
            </View>
        )
    }



    function renderStockInfo(){

        function back(){
            setViewMode("stockList");
            setStockInfo(null)
            setChartData(null)
            setChartInfo(null)
            setDisplayChart(true)
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

    return (
        <View>

            {viewMode === "stockList" && renderAllCompanies()}
            {viewMode === "stockInfo" && renderStockInfo()}

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
