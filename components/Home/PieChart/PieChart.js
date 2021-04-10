import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity,Dimensions, Image, Text, ScrollView, StyleSheet, Animated, FlatList, } from 'react-native';
import { VictoryPie} from "victory-native";
const { width } = Dimensions.get('window');

export default function PieChart() {
    
    const screenWidth = width;

    const ppl = [{"_id":"5fd58a58ef5a1a20a5e86fe4","name":"Heroku deployed","income":750000,"totalExpenses":1403.16,"targetToSave":50,"thisMonthStatus":"748439.25","savings":30150,"__v":0}];
    const categoriesData = [{"_id":"5fd5a2ab7cf13a4582762d07","name":"Food","icon":"https://res.cloudinary.com/graystack/image/upload/v1607835927/food_icon_zkefew.png","color":"#5C62B4","totalExpenseInThis":233.63999999999996,"__v":0},{"_id":"5fd5a3187cf13a4582762d08","name":"Clothes","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836396/cloth_icon_hliran.png","color":"#69D49A","totalExpenseInThis":256,"__v":0},{"_id":"5fd5a3cb7cf13a4582762d09","name":"Home","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836589/chart_icon_m1ioka.png","color":"#5AC3BE","totalExpenseInThis":227.14,"__v":0},{"_id":"5fd5a4d47cf13a4582762d0a","name":"Stationery","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836818/education_icon_phwkyz.png","color":"#ED716E","totalExpenseInThis":139,"__v":0},{"_id":"5fd5a4f87cf13a4582762d0b","name":"Hygiene","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836835/healthcare_icon_vibbol.png","color":"#FAC538","totalExpenseInThis":193.16000000000003,"__v":0},{"_id":"5fd5a52c7cf13a4582762d0c","name":"Others","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836863/more_icon_lk7k56.png","color":"#71B4FB","totalExpenseInThis":100,"__v":0}];
    const people = ppl[0];

    const [selectedCategory, setSelectedCategory] = useState(categoriesData[0].name);

    function getSampleData() {
        let requiredData = [];
        let mul = 100/people.totalExpenses;
        //console.log(categoriesData)
        for(let i=0 ; i<categoriesData.length ; i++) {
            const obj = categoriesData[i];
            let percentage = Math.round(obj.totalExpenseInThis*mul *10)/10;
            requiredData = [...requiredData, { x:`${percentage}`, y:percentage, z:categoriesData[i].name} ];
        }
        //console.log(requiredData);
        return requiredData;
    }

    function getColorScaleData() {
        let colorScaleData = [];
        for(let i=0 ; i<categoriesData.length ; i++) {
            const obj = categoriesData[i];
            colorScaleData = [...colorScaleData, obj.color];
        }
        //console.log(colorScaleData);
        return colorScaleData;
    }

    return (
        <View style={{marginBottom: 30}}>
            <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop: -30}}>
                <VictoryPie
                    colorScale={getColorScaleData()}
                    radius={({ datum }) => (selectedCategory == datum.z) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                    innerRadius={screenWidth*0.17}
                    labelRadius={({ innerRadius }) => (screenWidth * 0.4 + innerRadius) / 2.5}
                    data={getSampleData()}
                    style={{
                        labels: { fill: "white",fontFamily: 'GothamLight', fontSize: 16, lineHeight: 22 },
                    }}
                    width={screenWidth}
                    height={screenWidth}
                />
                <View style={{ position: 'absolute', top: '43%', left: "40%"}}>
                    <Text style={{ textAlign: 'center', fontFamily: 'GothamMedium', fontSize: 18, lineHeight: 32, color: "gray" }}>Expenses</Text>
                    <Text style={{ textAlign: 'center', fontFamily: 'GothamLight', fontSize: 13, lineHeight: 22 }}>This Month</Text>
                </View>
            </View>
            

            {categoriesData.map((obj) => {
                return(
                    <TouchableOpacity
                        key={obj._id}
                        style={{
                            flexDirection: 'row',
                            height: 40,
                            marginTop: 5,
                            paddingHorizontal: 12,
                            marginHorizontal: 18,
                            borderRadius: 8,
                            backgroundColor: (selectedCategory == `${obj.name}`) ? "#BEC1D2" : "white",
                        }}
                        onPress={() => {
                            console.log(`${obj.name} is selected for Pie Chart`);
                            setSelectedCategory(`${obj.name}`);
                        }}
                    >
                        {/* Name/Category */}
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: obj.color,
                                    borderRadius: 5
                                }}
                            />
                            <Text style={{ marginLeft: 8, fontFamily: 'GothamMedium',color: (selectedCategory == `${obj.name}`) ? "white" : "#194868"}}>{obj.name}</Text>
                        </View>

                        {/* Expenses */}
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{fontFamily: 'GothamLight', color: (selectedCategory == `${obj.name}`) ? "white" : "#194868" }}>₹ {Math.round(obj.totalExpenseInThis*100)/100} - {Math.round((obj.totalExpenseInThis*100)/people.totalExpenses *10)/10}%</Text>
                        </View>
                    </TouchableOpacity> 
                );
            })}
        </View>
    );
}

