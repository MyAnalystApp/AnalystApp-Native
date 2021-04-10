import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, StyleSheet, Animated, FlatList, } from 'react-native'
import LineDivider from '../components/LineDivider';
import Expense from '../components/Home/Expense/Expense';
import PieChart from '../components/Home/PieChart/PieChart';
import AddProduct from '../components/Home/AddProduct/AddProduct';
import Header from '../components/Home/Header';
import NavigationBar from '../components/Home/NavigationBar';
import ScanBill from '../components/Home/AddProduct/ScanBill';

export default function Home({ navigation }) {

    const [viewMode, setViewMode] = useState("expenses");

    const NavbarButtonHandler = (mode) => {
        console.log(`NavBar ${mode} Button is pressed!!`);
        setViewMode(mode);
        //console.log(categoriesData);
    }

    const categoryButtonHandler = (item) => {
        console.log(`${item.name} category button is pressed....`);
        setSelectedCategory(item);
    }

    /** Add Product Handlers Start */

    const AddProductSaveButtonHandler = (item) => {
        console.log("Add Product Button is pressed inside Add Product Page.\n", item);

        // let index = 0, isDone = true;
        // for(let i=0 ; i<categoriesData.length ; i++) {
        //     if(categoriesData[i].name === item.category) {
        //         index = i;
        //         break;
        //     }
        // }

        // fetch(`${myConstClass.HTTP_LINK}/updatePerson`,{
        //     method:"post",
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         id:people._id,
        //         name: people.name,
        //         income: people.income,
        //         totalExpenses: people.totalExpenses + item.total,
        //         targetToSave: people.targetToSave,
        //         thisMonthStatus: people.thisMonthStatus,
        //         savings: people.savings
        //     })
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(`total expense of ${people.name} is updated.`);
        // })
        // .catch(err=>{
        //     Alert.alert(`Some Error while updating total expense of ${people.name} inside Add product page`);
        //     isDone = false;
        //     console.log(err);
        // })
        
        // if(isDone) {
        //     fetch(`${myConstClass.HTTP_LINK}/updateCategory`,{
        //         method:"post",
        //         headers:{
        //             'Content-Type':'application/json'
        //         },
        //         body:JSON.stringify({
        //             id:categoriesData[index]._id,
        //             name: categoriesData[index].name,
        //             icon: categoriesData[index].icon,
        //             color: categoriesData[index].color,
        //             totalExpenseInThis: categoriesData[index].totalExpenseInThis + item.total
        //         })
        //     })
        //     .then(res=>res.json())
        //     .then(data=>{
        //         console.log(`total expense of ${item.category} category is updated.`);
        //     })
        //     .catch(err=>{
        //         Alert.alert(`Some Error while updating total expense of ${item.category} category inside Add product page`);
        //         isDone = false;
        //         console.log(err);
        //     })
        // }

        // if(isDone) {
        //     fetch(`${myConstClass.HTTP_LINK}/addExpense`,{
        //         method:"post",
        //         headers:{
        //             'Content-Type':'application/json'
        //         },
        //         body:JSON.stringify(item)
        //     })
        //     .then(res=>res.json())
        //     .then(data=>{
        //         Alert.alert(`Details of ${item.title} has been updated`)
        //     })
        //     .then(() => {
        //         NavbarButtonHandler("expenses");
        //         setLoading(true);
        //         fetchExpense();
        //         fetchCategory();
        //         fetchData();
        //         setLoading(false);
        //     })
        //     .catch(err=>{
        //         Alert.alert("Some Error while Adding product in Add Product Page.")
        //         console.log(err);
        //     });
        // } else {
        //     console.log("Product is not added due to error.");
        // }
    }

    /** Add Product END */

    const ScanBillDoneButtonHandler = (/*productList, totalExpenseForUser*/) => {
        console.log("Done Button is Pressed!!");
        // console.log(productList);

        // let n = productList.length, isDone = true;
        // const totalExpenseForCategory = {
        //     Food: 0,
        //     Clothes: 0,
        //     Home: 0,
        //     Stationery: 0,
        //     Hygiene: 0,
        //     Others: 0
        // }

        // for(let k=0 ; k<n ; k++) {
        //     totalExpenseForCategory[productList[k].category] += productList[k].total;
        // }

        // console.log("This is totalExpenseForCategory list : ");
        // console.log(totalExpenseForCategory);

        // fetch(`${myConstClass.HTTP_LINK}/updatePerson`,{
        //     method:"post",
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         id:people._id,
        //         name: people.name,
        //         income: people.income,
        //         totalExpenses: people.totalExpenses + totalExpenseForUser,
        //         targetToSave: people.targetToSave,
        //         thisMonthStatus: people.thisMonthStatus,
        //         savings: people.savings
        //     })
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(`total expense of ${people.name} is updated.`);
        // })
        // .catch(err=>{
        //     Alert.alert(`Some Error while updating total expense of ${people.name} inside Add product page`);
        //     console.log(err);
        //     isDone = false;
        // })

        // for(let k=0 ; k<categoriesData.length ; k++) {
        //     if(totalExpenseForCategory[categoriesData[k].name] === 0) {
        //         continue;
        //     }
        //     setTimeout(function() {
        //         fetch(`${myConstClass.HTTP_LINK}/updateCategory`,{
        //             method:"post",
        //             headers:{
        //                 'Content-Type':'application/json'
        //             },
        //             body:JSON.stringify({
        //                 id:categoriesData[k]._id,
        //                 name: categoriesData[k].name,
        //                 icon: categoriesData[k].icon,
        //                 color: categoriesData[k].color,
        //                 totalExpenseInThis: categoriesData[k].totalExpenseInThis + totalExpenseForCategory[categoriesData[k].name]
        //             })
        //         })
        //         .then(res=>res.json())
        //         .then(data=>{
        //             console.log(`total expense of ${categoriesData[k].name} category is updated.`);
        //         })
        //         .catch(err=>{
        //             Alert.alert(`Some Error while updating total expense of ${categoriesData[k].name} category inside Add product page`);
        //             isDone = false;
        //             console.log(err);
        //         })
        //     }, 500);

        //     if(!isDone) {
        //         break;
        //     }
        // }

        
        // for(let i=0 ; i<n ; i++) {
        //     const item = productList[i];

        //     setTimeout(function() {
        //         if(isDone) {
        //             fetch(`${myConstClass.HTTP_LINK}/addExpense`,{
        //                 method:"post",
        //                 headers:{
        //                     'Content-Type':'application/json'
        //                 },
        //                 body:JSON.stringify(item)
        //             })
        //             .then(res=>res.json())
        //             .then(data=>{
        //                 console.log(`\n #${i+1} ${item.title} is Added inside ${item.category} Category.`)
        //                 if(i==(n-1)) {
        //                     Alert.alert(`Details of All products has been updated`);
        //                     setTimeout(() => {
        //                         NavbarButtonHandler("expenses");
        //                         setLoading(true);
        //                         fetchExpense();
        //                         fetchCategory();
        //                         fetchData();
        //                         setLoading(false);
        //                     }, 1000);
        //                 }
        //             })
        //             .catch(err=>{
        //                 Alert.alert("Some Error while Adding product in Add Product Page.")
        //                 console.log(err);
        //             });
        //         } else {
        //             console.log(`\n${item.title} product is not added due to error.`);
        //             isDone = false;
        //         }
        //     }, 1000);

        //     if(!isDone) {
        //         break;
        //     }

        // }   // end-main-for
    }

    return (
        <ScrollView>
            
            <Header navigation={navigation} />
            <NavigationBar 
                NavbarButtonHandler={NavbarButtonHandler} 
                viewMode={viewMode} 
            />

            {viewMode == "expenses" && <Expense />}
            {viewMode == "chart" && <PieChart />}
            {   
                viewMode == "add" &&
                <ScanBill 
                    AddProductSaveButtonHandler={AddProductSaveButtonHandler}
                    ScanBillDoneButtonHandler={ScanBillDoneButtonHandler} 
                />
            }

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    itemButton: {
        flex: 1
    }
})
