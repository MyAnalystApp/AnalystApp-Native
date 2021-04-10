import React, { useState, useEffect } from 'react';
import { Button, Text, ScrollView, LogBox, View } from 'react-native';
import { key } from '../StockApiKey';

export default function Nifty50({ navigation }) {

    const [stockInfo, setStockInfo] = useState(null);

    useEffect(()=>{
        fetchStockInfo(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[]);

    const fetchStockInfo = () => {

        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=ADANIPORTS.NS%2CAMBUJACEM.NS%2CASIANPAINT.NS%2CAUROPHARMA.NS%2CAXISBANK.NS%2CBAJAJ-AUTO.NS%2CBAJFINANCE.NS%2CBPCL.NS%2CBHARTIARTL.NS%2CINFRATEL.NS%2CBOSCHLTD.NS%2CCIPLA.NS%2CCOALINDIA.NS%2CDRREDDY.NS%2CEICHERMOT.NS%2CGAIL.NS%2CHCLTECH.NS%2CHDFCBANK.NS%2CHEROMOTOCO.NS%2CHINDALCO.NS%2CHINDPETRO.NS%2CHINDUNILVR.NS%2CHDFC.NS%2CITC.NS%2CICICIBANK.NS%2CIBULHSGFIN.NS%2CIOC.NS%2CINDUSINDBK.NS%2CINFY.NS%2CKOTAKBANK.NS%2CLT.NS%2CLUPIN.NS%2CM%26M.NS%2CMARUTI.NS%2CNTPC.NS%2CONGC.NS%2CPOWERGRID.NS%2CRELIANCE.NS%2CSBIN.NS%2CSUNPHARMA.NS%2CTCS.NS%2CTATAMOTORS.NS%2CTATASTEEL.NS%2CTECHM.NS%2CULTRACEMCO.NS%2CUPL.NS%2CVEDL.NS%2CWIPRO.NS%2CYESBANK.NS%2CZEEL.NS", {
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
                        {/* <Text>
                            {JSON.stringify(stockInfo, null, 4)}
                        </Text> */}
                        <View>
                            {stockInfo.quoteResponse.result.map(val => {
                                return(
                                    <Text>{val.bid}</Text>
                                )
                            })}
                        </View>
                    </View>
                )}
                
            </ScrollView>
            
        </> 
    );
};