import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, StyleSheet, Animated, FlatList, LogBox } from 'react-native'


export default function Expense() {

    const categoriesData = [{"_id":"5fd5a2ab7cf13a4582762d07","name":"Food","icon":"https://res.cloudinary.com/graystack/image/upload/v1607835927/food_icon_zkefew.png","color":"#5C62B4","totalExpenseInThis":233.63999999999996,"__v":0},{"_id":"5fd5a3187cf13a4582762d08","name":"Clothes","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836396/cloth_icon_hliran.png","color":"#69D49A","totalExpenseInThis":256,"__v":0},{"_id":"5fd5a3cb7cf13a4582762d09","name":"Home","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836589/chart_icon_m1ioka.png","color":"#5AC3BE","totalExpenseInThis":227.14,"__v":0},{"_id":"5fd5a4d47cf13a4582762d0a","name":"Stationery","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836818/education_icon_phwkyz.png","color":"#ED716E","totalExpenseInThis":139,"__v":0},{"_id":"5fd5a4f87cf13a4582762d0b","name":"Hygiene","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836835/healthcare_icon_vibbol.png","color":"#FAC538","totalExpenseInThis":193.16000000000003,"__v":0},{"_id":"5fd5a52c7cf13a4582762d0c","name":"Others","icon":"https://res.cloudinary.com/graystack/image/upload/v1607836863/more_icon_lk7k56.png","color":"#71B4FB","totalExpenseInThis":100,"__v":0}]
    let expenses = [{"description":"","date":"2020-12-21T03:25:08.424Z","_id":"5fe03630fd85a221c564eacf","title":"Door Mat","category":"Home","total":150,"__v":0},{"description":"","date":"2020-12-21T03:25:08.424Z","_id":"5fe0366cfd85a221c564ead0","title":"Gloves","category":"Clothes","total":56,"__v":0},{"description":"","date":"2020-12-21T03:25:08.424Z","_id":"5fe0369cfd85a221c564ead1","title":"Pizza","category":"Others","total":89,"__v":0},{"description":"","date":"2020-12-21T03:25:08.424Z","_id":"5fe036ccfd85a221c564ead3","title":"Vaseline","category":"Hygiene","total":59,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe07adf34b504b1d74944ad","title":"Classmate Notebook","category":"Stationery","total":89,"__v":0},{"description":"Tel","date":"2020-12-21T06:19:52.847Z","_id":"5fe0879d34b504b1d74944b4","title":"Petrol","category":"Others","total":100,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a28434b504b1d74944b8","title":" BT RAWRICE","category":"Home","total":41.14,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a28534b504b1d74944be","title":" AMUL VANILA IC CR","category":"Hygiene","total":19.58,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a28634b504b1d74944c4","title":" CUCUMBER HYBRID","category":"Home","total":18,"__v":0},{"description":"Description","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a37034b504b1d74944c6","title":" APPY JUICE","category":"Food","total":17.44,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a37134b504b1d74944c8","title":" SUGAR","category":"Food","total":38.76,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a37134b504b1d74944ca","title":" CHILLY GREEN","category":"Food","total":5,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a37134b504b1d74944cd","title":" ORANGE CITRUS","category":"Hygiene","total":95,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a37134b504b1d74944ce","title":" CUCUMBER HYBRID","category":"Home","total":18,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a37134b504b1d74944cf","title":" GINGER OS.00","category":"Food","total":46,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a46d34b504b1d74944d1","title":" AIUL VANILA IC CR","category":"Hygiene","total":19.58,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0a46e34b504b1d74944d4","title":" ORANGE CITRUS","category":"Hygiene","total":95,"__v":0},{"description":"","date":"2020-12-21T06:19:52.847Z","_id":"5fe0af0134b504b1d74944d6","title":" APPY JUICE ML","category":"Food","total":17.44,"__v":0},{"description":"Hui add?","date":"2020-12-24T16:22:18.598Z","_id":"5fe4caa0cd4f670017ea6f38","title":"Maggie","category":"Food","total":20,"__v":0},{"description":"","date":"2020-12-24T16:22:18.598Z","_id":"5fe4cececd4f670017ea6f39","title":"Pencil","category":"Stationery","total":50,"__v":0},{"description":"","date":"2020-12-24T16:22:18.598Z","_id":"5fe4d9cacd4f670017ea6f3b","title":"T-shirt","category":"Clothes","total":200,"__v":0}];
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    function renderItem({ item }){
        return(
            <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={styles.itemButton}
            >
                <Image
                    source={{uri: item.icon}}
                    style={{ width: 20, height: 20, tintColor: item.color }}
                />
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    if(selectedCategory !== null) {
        expenses = expenses.filter(item => {
            if(item.category === selectedCategory.name) {
                return item;
            }
        });
    }


    const renderList = ({ item, index }) => (
        <View style={{
                width: 250,
                marginRight: 24,
                marginLeft: index == 0 ? 24 : 0,
                marginVertical: 0,
                borderRadius: 8,
                backgroundColor: "white",
            }}>

            <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 25,
                        backgroundColor: "white",
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 8
                    }}
                >
                    <Image
                        source={{uri: selectedCategory.icon}}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: selectedCategory.color
                        }}
                    />
                </View>
                <Text style={{ fontSize: 16, lineHeight: 22, color: selectedCategory.color, fontFamily: 'GothamMedium'}}>{selectedCategory.name}</Text>
            </View>

            {/* Expense Description */}
            <View style={{ paddingHorizontal: 24 }}>
                {/* Title and description */}
                <Text style={{ fontSize: 18, lineHeight: 20, fontFamily: 'GothamMedium' }}>{item.title}</Text>
                
                {(item.description) ? 
                <Text style={{ fontSize: 12, lineHeight: 30, flexWrap: 'wrap', color: '#898C95', fontFamily: 'GothamLight' }}>
                    {item.description}
                </Text> : 
                <View style={{ height: 30 }} /> }
                
            </View>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 24,
                    borderBottomStartRadius: 8,
                    borderBottomEndRadius: 8,
                    backgroundColor: selectedCategory.color,
                }}
                // onPress={() => editProductHandler("editProduct", item)}
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <Text style={{ marginLeft: 8, color: "white", fontFamily: 'GothamMedium'}}>₹ {item.total.toFixed(2)}</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center', marginRight: 10 }}>
                    <Image style={{width: 18, height:18, tintColor:"white"}}source={require('../../../assets/icons/right-arrow.png')} />
                </View>
            </TouchableOpacity>
        </View>
    )


    return (
        <ScrollView>

            <View style={styles.mainCategoryHeading}>
                <View>
                    <Text style={styles.titleText}>CATEGORIES</Text>
                    <Text style={styles.titleSubText}>6 Total</Text>
                </View>
            </View>



            <View style={{ paddingHorizontal: 19 }}>
            <Animated.View>
                <FlatList
                    data={categoriesData}
                    renderItem={renderItem}
                    keyExtractor={item => `${item._id}`}
                    numColumns={2}
                />
            </Animated.View>

            <View style={styles.totalExpenseButton} >
                <View>
                    <Text style={styles.totalExpenseText}>
                        Total spend  ₹ 6109
                    </Text>
                </View>
            </View>
        </View>
                    
        <View style={{ height: 80, backgroundColor: '#F2F2F2', padding: 24 }}>
            <Text style={{ fontSize: 16, lineHeight: 22, color: "#194868", fontFamily: 'GothamMedium'}}>PREVIOUS EXPENSES</Text>
            <Text style={{fontSize: 14, lineHeight: 22, color: '#898C95', fontFamily: 'GothamLight'}}>This Week</Text>
        </View>

        {
            selectedCategory === null &&
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
                <Text style={{ color: "#194868", lineHeight: 22, fontFamily: 'GothamLight' }}>Click on any above categories in categories section</Text>
            </View>
        }
        {
            selectedCategory !== null &&
            <FlatList
                data={expenses}
                renderItem={renderList}
                keyExtractor={item => `${item._id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        }

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    mainCategoryHeading : {
        flexDirection: 'row', 
        paddingHorizontal: 26,
        paddingBottom:14, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
    },
    titleText: {
        color: "#194868",
        lineHeight: 22,
        fontFamily: 'GothamBold'
    },
    titleSubText: { 
        color: '#898C95', 
        lineHeight: 22,
        fontFamily: 'GothamLight'
    },

    itemButton: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: "white",
    },
    itemText: {
        marginLeft: 8, 
        color: "#194868", 
        lineHeight: 22, 
        fontFamily: 'GothamMedium',
    },
    totalExpenseButton: {
        backgroundColor: "#FF615F",
        marginTop: 5,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 8
    },
    totalExpenseText: {
        marginTop:0, 
        lineHeight: 22, 
        color: 'white', 
        textAlign: "center",
        fontFamily: 'GothamMedium'
    }  
})
