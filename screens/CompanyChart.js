import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Button, Text, ScrollView, LogBox } from 'react-native';
import { key } from '../StockApiKey';
import LineDivider from '../components/LineDivider';

export default function CompanyChart({ navigation }) {

    const [chartInfo, setChartInfo] = useState(null);
    const [val, setVal] = useState('BSESN');

    useEffect(()=>{
        fetchStockInfo(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[]);

    let dataX = [];
    let dataY = [];
    let data = [];

    const fetchStockInfo = () => {
        fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=%5E${val}&range=1d&region=IN`, {
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
            console.error(JSON.stringify(err, null, 4));
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
            data.push({x : dataX[i], y: dataY[i]})
        }

    }

    return (
        <>
            <Button
                onPress={() => navigation.toggleDrawer()}
                title="Drawer"
            />

            <View style={{ flex: 1, justifyContent: 'center', padding: 24,}}>
                <View style={{ flexDirection: 'row', height: 55, backgroundColor: "white", borderRadius: 8 }}>

                    <TouchableOpacity
                        style={{ 
                            flex: 1,
                            backgroundColor: val == "BSESN" ? "#BEC1D2" : null, 
                            margin: 5,
                            borderRadius: 6,
                        }}
                        onPress={() => {    
                            setVal("BSESN");
                            fetchStockInfo();
                        }}
                        
                    >
                        <View 
                            style={{ 
                                flex: 1, 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                            <Text style={{  marginLeft: 0, fontSize: 16, fontFamily: "GothamMedium", lineHeight: 22, color: "black"}}> Sensex Chart </Text>
                        </View>
                    </TouchableOpacity>

                    <LineDivider />

                    <TouchableOpacity
                        style={{ 
                            flex: 1,
                            backgroundColor: val == "NSEI" ? "#BEC1D2" : null, 
                            margin: 5,
                            borderRadius: 8,
                        }}
                        onPress={() => {    
                            setVal("NSEI");
                            fetchStockInfo();
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
                            <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}> Nifty Chart </Text>
                        </View>
                    </TouchableOpacity> 

                </View>
            </View>

            <ScrollView>
                {chartInfo == null ? <Text>Loading...</Text> : (
                    <Text>{chartInfo.result[0].meta.currency}</Text>
                )}
                <Text>
                    {JSON.stringify(chartInfo, null, 4)}
                </Text>
            </ScrollView>
        </> 
    );
};