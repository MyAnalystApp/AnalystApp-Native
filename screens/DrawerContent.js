import React, {useRef, useState} from 'react';
import { Button, View, Text, Image, TouchableOpacity, DrawerLayoutAndroid, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Market from '../screens/Market';
import Crypto from '../screens/Crypto';
import About from '../screens/About';
import Fonts from '../screens/Fonts';
import Test from '../screens/Test';
import CompanyInfo from '../screens/CompanyInfo';
import CompanyChart from '../screens/CompanyChart';
import Sensex30 from '../screens/Sensex30';
import Nifty50 from '../screens/Nifty50';

const { height, width } = Dimensions.get('window');

const Drawer = createDrawerNavigator();

export default function DrawerContent({navigation}) {

  const [screen, setScreen] = useState("Home");

  function navigateScreen(val){
    navigation.navigate(val)
    setScreen(val)
  }

  return (

    <ScrollView>

        <View style={{borderBottomWidth: 1, borderColor: "#E7E7E9", marginBottom: 10, alignItems: 'center', paddingBottom: 20}}>
          <Image style={{width: width*(1/3), height: width*(1/3), marginTop: 10, marginBottom: 20}} source={{uri: 'https://image.freepik.com/free-vector/investment-money-illustration-investment-plant-growing-business-finance-icon-concept-white-isolated_138676-624.jpg'}} />
          <View style={{flexDirection: 'column', alignItems: 'center', paddingBottom: 20}}>
            <Text style={{color: '#070044', fontFamily: 'GothamMedium', fontSize: 18}}>Hello,</Text>
            <Text style={{color: '#070044', fontFamily: 'GothamMedium', fontSize: 16, marginTop: 10}}>Bruce Wayne</Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row', 
              marginBottom: 10,
              marginVertical: 5, 
              paddingVertical: 10,
              marginLeft: 10,
              paddingLeft: width*(1/9),
              marginRight: 10,
              borderRadius: 6,
              backgroundColor: "white"
          }}
            onPress={() => navigateScreen("Home")}
          >
            <Image style={{width: 20, height: 20, tintColor: '#68B6F2'}} source={require('../assets/icons/home.png')} />
            <Text style={{marginLeft: 40, alignSelf: 'center' ,fontFamily: 'GothamMedium', fontSize: 16, color: 'grey'}}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row', 
              marginBottom: 10,
              marginVertical: 5, 
              paddingVertical: 10,
              marginLeft: 10,
              paddingLeft: width*(1/9),
              marginRight: 10,
              borderRadius: 6,
              backgroundColor: screen === "Profile" ? "white" : "white"
          }}
            onPress={() => navigateScreen("Profile")}
          >
            <Image style={{width: 20, height: 20, tintColor: '#DCCC47'}} source={require('../assets/icons/user.png')} />
            <Text style={{marginLeft: 40, alignSelf: 'center' ,fontFamily: 'GothamMedium', fontSize: 16, color: 'grey'}}>Profile</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              marginVertical: 5, 
              paddingVertical: 10,
              marginLeft: 10,
              paddingLeft: width*(1/9),
              marginRight: 10,
              borderRadius: 6,
              backgroundColor: screen === "Crypto" ? "white" : "white"
          }}
            onPress={() => navigateScreen("Crypto")}
          >
            <Image style={{width: 20, height: 20, tintColor: '#B27BD4'}} source={{uri: 'https://static.thenounproject.com/png/1546704-200.png'}} />
            <Text style={{marginLeft: 40, alignSelf: 'center' ,fontFamily: 'GothamMedium', fontSize: 16, color: 'grey'}}>Crypto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              marginVertical: 5, 
              paddingVertical: 10,
              marginLeft: 10,
              paddingLeft: width*(1/9),
              marginRight: 10,
              borderRadius: 6,
              backgroundColor: screen === "Market" ? "white" : "white"
          }}
            onPress={() => navigateScreen("Market")}
          >
            <Image style={{width: 20, height: 20, tintColor: '#37E39F'}} source={require('../assets/icons/line_graph.png')} />
            <Text style={{marginLeft: 40, alignSelf: 'center' ,fontFamily: 'GothamMedium', fontSize: 16, color: 'grey'}}>Market</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              marginVertical: 5, 
              paddingVertical: 10,
              marginLeft: 10,
              paddingLeft: width*(1/9),
              marginRight: 10,
              borderRadius: 6,
              backgroundColor: screen === "About" ? "white" : "white"
          }}
            onPress={() => navigateScreen("About")}
          >
            <Image style={{width: 22, height: 22, tintColor: '#F7C594'}} source={require('../assets/icons/info.png')} />
            <Text style={{marginLeft: 40, alignSelf: 'center' ,fontFamily: 'GothamMedium', fontSize: 16, color: 'grey'}}>About</Text>
          </TouchableOpacity>

        </View>


        {/* <TouchableOpacity
          style={{ marginVertical:10, paddingVertical: 20, paddingHorizontal: '40%', backgroundColor: 'pink'}}
          onPress={() => navigation.navigate('Fonts')}
        >
          <Text>Fonts</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{ marginVertical:10, paddingVertical: 20, paddingHorizontal: '40%', backgroundColor: 'pink'}}
          onPress={() => navigation.navigate('Testing')}
        >
          <Text>Test</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{ marginVertical:10, paddingVertical: 20, paddingHorizontal: '40%', backgroundColor: 'pink'}}
          onPress={() => navigation.navigate('CompanyInfo')}
        >
          <Text>CompanyInfo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginVertical:10, paddingVertical: 20, paddingHorizontal: '40%', backgroundColor: 'pink'}}
          onPress={() => navigation.navigate('CompanyChart')}
        >
          <Text>CompanyChart</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{ marginVertical:10, paddingVertical: 20, paddingHorizontal: '40%', backgroundColor: 'pink'}}
          onPress={() => navigation.navigate('Sensex30')}
        >
          <Text>Sensex30</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginVertical:10, paddingVertical: 20, paddingHorizontal: '40%', backgroundColor: 'pink'}}
          onPress={() => navigation.navigate('Nifty50')}
        >
          <Text>Nifty50</Text>
        </TouchableOpacity> */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  }
});