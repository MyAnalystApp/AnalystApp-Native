import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, FlatList, LogBox } from 'react-native';


export default function CryptoHeader() {

    const [trending, setTrending] = useState(null);

    const fetchTrending = () => {
        fetch(`https://api.coingecko.com/api/v3/search/trending`)
        .then(res=>res.json())
        .then(result_coin=>{
            setTrending(result_coin.coins);
            // console.log(JSON.stringify(trending.coins,null,4));
        })
    }

    useEffect(()=>{
        fetchTrending(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[])

    const renderItem = ({item, index}) =>(
            
        <TouchableOpacity
            style={{
                width: 200,
                paddingTop: 20,
                paddingBottom: 20,
                paddingHorizontal: 30,
                marginLeft: index == 0 ? 12 : 0,
                marginRight: 20,
                borderRadius: 10,
                backgroundColor: "white"
            }}
        >
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Image 
                        source={{ uri: `${item.item.large}`}}
                        resizeMode="cover"
                        style={{
                            marginTop: 0,
                            width: 25,
                            height: 25,
                            marginTop: 5
                        }}
                    />
                </View>
                <View style={{marginLeft: 8}}>
                    <Text style={{color:"black", fontFamily: "GothamBold", fontSize: 16, lineHeight: 30}}>{item.item.name}</Text>
                    <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 22}}>{item.item.symbol}</Text>
                </View>

            </View>

            <View style={{marginTop: 12, flexDirection: 'row'}}>
                <Text style={{color:"black", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 30}}>Market Cap Rank: </Text>
                <Text style={{color: "grey", fontFamily: "GothamMedium", fontSize: 12, lineHeight: 30}}>{item.item.market_cap_rank}</Text>
            </View>
            
        </TouchableOpacity>
    )

    return (
        <View style={{flex: 1, paddingBottom: 10}} >
            <View style={{  width: "100%",  height: 300 }} > 
                <ImageBackground
                    source={require('../../../assets/images/banner.png')}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 50
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 50
                        }}
                    >
                        <Text style={{color: "white", fontFamily: "GothamBold", fontSize: 22, lineHeight: 22}}>Cryptocurrency</Text>

                    </View>

                    <View style={{ position: 'absolute', bottom: "-20%"}}>
                        {trending===null ? (
                            <Text style={{marginLeft:16, color: "black", fontFamily: "GothamMedium", fontSize: 14, lineHeight: 30}}>
                                Loading...
                            </Text>
                        ) : (
                            <Text style={{marginLeft:16, color: "white", fontFamily: "GothamMedium", fontSize: 14, lineHeight: 30}}>
                                Trending
                            </Text>
                        )}

                        <FlatList 
                            contentContainerStyle={{marginTop: 8}}
                            data={trending}
                            renderItem={renderItem}
                            keyExtractor={item => `${item.item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />

                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
   
})
