import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import LineDivider from '../LineDivider';

export default function NavigationBar({ NavbarButtonHandler, viewMode }) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 24,}}>
            <View style={{ flexDirection: 'row', height: 55, backgroundColor: "white", borderRadius: 8 }}>

                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        backgroundColor: viewMode == "expenses" ? "#BEC1D2" : null, 
                        margin: 5,
                        borderRadius: 6,
                    }}
                    onPress={() => NavbarButtonHandler("expenses")}
                    
                >
                    <View 
                        style={{ 
                            flex: 1, 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                        <Text style={{  marginLeft: 0, fontSize: 16, fontFamily: "GothamMedium", lineHeight: 22, color: "black"}}> Expenses </Text>
                    </View>
                </TouchableOpacity>

                <LineDivider />

                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        backgroundColor: viewMode == "chart" ? "#BEC1D2" : null, 
                        margin: 5,
                        borderRadius: 8,
                    }}
                    onPress={() => NavbarButtonHandler("chart")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}> Pie Chart </Text>
                    </View>
                </TouchableOpacity> 

                <LineDivider />

                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        backgroundColor:  viewMode == "add" ? "#BEC1D2" : null, 
                        margin: 5,
                        borderRadius: 8,
                    }}
                    onPress={() => NavbarButtonHandler("add")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}> Add </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};