import * as React from 'react';
import { Button, View, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Market from './screens/Market';
import Crypto from './screens/Crypto';
import About from './screens/About';
import Fonts from './screens/Fonts';
import Test from './screens/Test';
import DrawerContent from './screens/DrawerContent';
import CompanyInfo from './screens/CompanyInfo';
import CompanyChart from './screens/CompanyChart';
import Sensex30 from './screens/Sensex30';
import Nifty50 from './screens/Nifty50';

import { person } from './data';

const { width } = Dimensions.get("window");
const Drawer = createDrawerNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator 
				initialRouteName="Crypto" 
				drawerContent={props => <DrawerContent {...props} />}
				drawerStyle={{
					width: width*(2/3),
				}}
			>
				<Drawer.Screen name="Home">
					{(props) => <Home {...props}/>}
				</Drawer.Screen>
				<Drawer.Screen name="Profile">
					{(props) => <Profile person={person} {...props}/>}
				</Drawer.Screen>
				<Drawer.Screen name="Crypto" component={Crypto} />
				<Drawer.Screen name="Market" component={Market} />
				<Drawer.Screen name="About" component={About} />
				<Drawer.Screen name="Fonts" component={Fonts} />
				<Drawer.Screen name="Testing" component={Test} />
				<Drawer.Screen name="CompanyInfo" component={CompanyInfo} />
				<Drawer.Screen name="CompanyChart" component={CompanyChart} />
				<Drawer.Screen name="Sensex30" component={Sensex30} />
				<Drawer.Screen name="Nifty50" component={Nifty50} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}