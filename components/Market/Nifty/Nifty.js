import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated, ImageBackground, FlatList, LogBox, TextInput } from 'react-native';
import {VictoryScatter, VictoryLine, VictoryChart, VictoryAxis, VictoryBar} from "victory-native";
import VictoryCustomTheme from '../VictoryCustomTheme';
import {key} from '../../../StockApiKey';

const { width } = Dimensions.get("window");

export default function Nifty({sendDataToParent}) {

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        );
    }

    const [viewMode, setViewMode] = useState("stockList");
    const [stockList, setStockList] = useState(null);

    const [niftyInfo, setNiftyInfo] = useState(null);
    const [niftyChart, setNiftyChart] = useState(null);
    const [showNiftyChart, setShowNiftyChart] = useState(false);


    function fetchStockList() {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=ADANIPORTS.NS%2CAMBUJACEM.NS%2CASIANPAINT.NS%2CAUROPHARMA.NS%2CAXISBANK.NS%2CBAJAJ-AUTO.NS%2CBAJFINANCE.NS%2CBPCL.NS%2CBHARTIARTL.NS%2CINFRATEL.NS%2CBOSCHLTD.NS%2CCIPLA.NS%2CCOALINDIA.NS%2CDRREDDY.NS%2CEICHERMOT.NS%2CGAIL.NS%2CHCLTECH.NS%2CHDFCBANK.NS%2CHEROMOTOCO.NS%2CHINDALCO.NS%2CHINDPETRO.NS%2CHINDUNILVR.NS%2CHDFC.NS%2CITC.NS%2CICICIBANK.NS%2CIBULHSGFIN.NS%2CIOC.NS%2CINDUSINDBK.NS%2CINFY.NS%2CKOTAKBANK.NS%2CLT.NS%2CLUPIN.NS%2CM%26M.NS%2CMARUTI.NS%2CNTPC.NS%2CONGC.NS%2CPOWERGRID.NS%2CRELIANCE.NS%2CSBIN.NS%2CSUNPHARMA.NS%2CTCS.NS%2CTATAMOTORS.NS%2CTATASTEEL.NS%2CTECHM.NS%2CULTRACEMCO.NS%2CUPL.NS%2CVEDL.NS%2CWIPRO.NS%2CYESBANK.NS%2CZEEL.NS", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": key,
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(res => {
            setStockList(res);
        })
        .catch(err => {
            console.error(err);
        });
    }

    function fetchNiftyInfo(){
        fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=%5ENSEI&range=1d&region=IN`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": key,
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(res => {
            setNiftyInfo(res.chart);
        })
        .catch(err => {
            console.error(JSON.stringify(err, null, 4));
        });

        (niftyInfo == null || niftyChart != null) ? "skip" : (
            fillNiftyChart()
        )
    }

    useEffect(()=>{
        fetchStockList(),
        fetchNiftyInfo(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[]);


    let dataXN = [];
    let dataYN = [];
    let dataN = [];

    function fillNiftyChart(){

        niftyInfo.result[0].timestamp.map(info => {
            dataXN.push(info)
            // console.log(info)
        }),

        niftyInfo.result[0].indicators.quote[0].open.map(info => {
            dataYN.push(info)
            // console.log(info)
        });

        // let i = 0;

        for(let i = 0; i<dataXN.length; i++){
            dataN.push({x : dataXN[i], y: dataYN[i]})
        }

        setNiftyChart(dataN)
        
    }

    function ifNiftyChart() {
        niftyChart == null ? (
            fillNiftyChart()
        ) : "skip"
        
        showNiftyChart == true ? (
            setShowNiftyChart(false)
        ) : (
            setShowNiftyChart(true)
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
                                <Text style={{  marginLeft: 0, fontSize: 14, fontFamily: "GothamMedium" , color: "black"}}>Nifty</Text>
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
                                    source={{uri: 'https://img.dtnext.in/Articles/2021/Jan/202101172127510619_Newage-insurance-green-energy-stocks-in-queue-for-Nifty50_SECVPF.gif'}}
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
                                <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30, alignSelf: 'center'}}>Nifty 50</Text>
                                <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22, alignSelf: 'center', marginHorizontal: 20, marginTop: 10}}>Rendering all nifty 50 companies list. Click on them to view detailed info along with their today's chart.</Text>
                            </View>

                        </View>

                    </View>
                </View>


                {!showNiftyChart ? (
                    <TouchableOpacity
                        onPress={() => ifNiftyChart()}
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

                                data={niftyChart}
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
                        onPress={() => ifNiftyChart()}
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
