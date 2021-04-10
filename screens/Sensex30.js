import React, { useState, useEffect } from 'react';
import { Button, Text, ScrollView, LogBox, View } from 'react-native';
import { key} from '../StockApiKey';

export default function Sensex30({ navigation }) {

    const [stockInfo, setStockInfo] = useState(null);

    useEffect(()=>{
        fetchStockInfo(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[]);

    const fetchStockInfo = () => {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=INFY.BO%2CTCS.BO%2CRELIANCE.BO%2CICICIBANK.BO%2CHDFCBANK.BO%2CHCLTECH.BO%2CBHARTIARTL.BO%2CINDUSINDBK.BO%2CSBIN.BO%2CLT.BO%2CTECHM.BO%2CAXISBANK.BO%2CITC.BO%2CBAJAJ-AUTO.BO%2CONGC.BO%2CTATASTEEL.BO%2CNTPC.BO%2CM%26M.BO%2CASIANPAINT.BO%2CPOWERGRID.BO%2CBAJAJFINSV.BO%2CTITAN.BO%2CNESTLEIND.BO%2CULTRACEMCO.BO%2CSUNPHARMA.BO%2CBAJFINANCE.BO%2CMARUTI.BO%2CHDFC.BO%2CHINDUNILVR.BO%2CKOTAKBANK.BO", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": key,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(res => {
        setStockInfo(res);
    })
    .catch(err => {
        console.error(err);
    });
    }

    return (
        <>
            <Button
                onPress={() => navigation.toggleDrawer()}
                title="Drawer"
            />

            <ScrollView>

                {stockInfo == null ? <Text>Null</Text> : (
                    <View>
                        <Text>
                            {JSON.stringify(stockInfo, null, 4)}
                        </Text>
                        <View>
                            {stockInfo.quoteResponse.result.map(val => {
                                return(
                                    <Text>{val.bid}</Text>
                                )
                            })}
                        </View>
                    </View>
                )}
                

                {/* {stockInfo.quoteResponse.result} */}
            </ScrollView>
            
        </> 
    );
};