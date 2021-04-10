import React, { useState, useEffect } from 'react';
import { Button, Text, ScrollView, LogBox } from 'react-native';
import { key } from '../StockApiKey';

export default function CompanyInfo({ navigation }) {

    const [stockInfo, setStockInfo] = useState(null);

    useEffect(()=>{
        fetchStockInfo(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[]);

    const fetchStockInfo = () => {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=INFY.NS", {
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
                <Text>
                    {JSON.stringify(stockInfo, null, 4)}
                </Text>
            </ScrollView>
            
        </> 
    );
};