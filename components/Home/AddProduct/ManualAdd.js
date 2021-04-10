import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { person } from '../../../data';

export default function ManualAdd({ /*categoriesData, people,*/ AddProductSaveButtonHandler }) {
    
    const [selectedValue, setSelectedValue] = useState("Food");
    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState(null);
    const [description, setDescription] = useState();

    // yeh delete karna hai baadme 
    const [categoriesData, setCategoriesData] = useState(person.categoriesData);

    let [check_name, setCheck_name] = useState(true);
    let [check_amount, setCheck_amount] = useState(true);

    function pick() {
        if(productName.length==0 || amount==null || isNaN(amount) || !isNaN(productName)){
            if(!isNaN(productName || productName.length==0)){
                setCheck_name(false);
            }
            if(isNaN(amount) || amount==null){
                setCheck_amount(false);
            }
            if(isNaN(productName)){
                setCheck_name(true);
            }
            if(productName.length!==0){
                setCheck_name(true);
            }
            if(!isNaN(amount) && amount!==null){
                setCheck_amount(true);
            }
            Alert.alert('Please fill proper input.');

        } else {
            const obj = {
                title: productName,
                description: description,
                category: selectedValue,
                total: Number(amount)
            }
            
           AddProductSaveButtonHandler(obj);
        }
    };

    return (
        <View>
            <View style={styles.container} >
                <Text style={{
                    marginTop: 15,
                    textAlign: "center", 
                    color:"#1B9ED6", 
                    fontFamily:"GothamBold", 
                    fontSize: 17, 
                    paddingBottom: 20,
                }}>Add a Product</Text>

                <View style={{borderBottomWidth: 0.75, borderBottomColor: "#ccc", marginHorizontal: 60, marginBottom: 20}} />

                <Text style={styles.Text}>Product Name</Text>
                <TextInput 
                    style={{
                    backgroundColor: "#EEF8FF",
                    borderWidth: 1,
                    borderColor: check_name ? "#EEF8FF" : "red",
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 8,
                    marginBottom: 12,
                    fontFamily: 'GothamLight', 
                    fontSize: 14,
                }}
                    placeholder="Enter name here.." 
                    value={productName}
                    onChangeText={text => setProductName(text)}
                />

                <Text style={styles.Text}>Category</Text>
                <View style={{
                    backgroundColor: "#EEF8FF",
                    marginTop: 8,
                    marginBottom: 12,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#EEF8FF",
                }}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                        
                        {categoriesData.map((item) => {
                            return (
                                <Picker.Item key={item._id} label={item.name} value={item.name} />
                            );  
                        })}
                    </Picker>
                </View>

                <Text style={styles.Text}>Amount</Text>
                <TextInput 
                    style={{
                        backgroundColor: "#EEF8FF",
                        borderWidth: 1,
                        borderColor: check_amount ? "#EEF8FF" : "red",
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 8,
                        marginBottom: 12,
                        fontFamily: 'GothamLight', 
                        fontSize: 14
                    }}
                    placeholder="694.20" 
                    value={amount}
                    onChangeText={text => setAmount(text)}
                />

                <Text style={styles.Text}>Description</Text>
                <TextInput 
                    style={styles.inputField}
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
                <TouchableOpacity 
                    style={{paddingTop: 10,marginTop: 10, marginBottom: 20}}
                    onPress={() => { pick()}}
                >
                    <View style={styles.button}>
                        <Text style={{color: "#1B9ED6", textAlign: "center", fontFamily: 'GothamMedium'}}>Add Product</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingTop: 10,
        backgroundColor: 'white',
        marginHorizontal: 25,
        borderRadius: 8,
        paddingHorizontal: 10
    }, 
    inputField : {
        backgroundColor: "#EEF8FF",
        borderWidth: 1,
        borderColor: "#EEF8FF",
        borderRadius: 5,
        padding: 10,
        marginTop: 8,
        marginBottom: 12,
        fontFamily: 'GothamLight', 
        fontSize: 14,
    },

    Text : {
        fontSize: 14,
        color: "black",
        marginLeft: 2,
        paddingTop: 8,
        fontFamily: 'GothamMedium',
    },

    button : {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 6,
        marginBottom: -10,
        marginTop: -10,
        borderWidth: 4,
        borderColor: "#EEF8FF"
    }
})