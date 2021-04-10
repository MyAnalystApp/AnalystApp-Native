import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default function Fonts({ navigation }) {

    return (
        <>
            <Button
                onPress={() => navigation.toggleDrawer()}
                title="Drawer"
            />

            <View 
                style={{
                    justifyContent: 'center', 
                    alignItems: 'center',
                    marginTop: 150
                }} 
            >
                <Text style={{fontFamily: 'GothamBold', marginTop: 10}}>GothamBold</Text>
                <Text style={{fontFamily: 'GothamBoldItalic', marginTop: 10}}>GothamBoldItalic</Text>
                <Text style={{fontFamily: 'GothamBook', marginTop: 10}}>GothamBook</Text>
                <Text style={{fontFamily: 'GothamBoookItalic', marginTop: 10}}>GothamBoookItalic</Text>
                <Text style={{fontFamily: 'GothamLight', marginTop: 10}}>GothamLight</Text>
                <Text style={{fontFamily: 'GothamLightItalic', marginTop: 10}}>GothamLightItalic</Text>
                <Text style={{fontFamily: 'GothamMedium', marginTop: 10}}>GothamMedium</Text>
                <Text style={{fontFamily: 'GothamMediumItalic', marginTop: 10}}>GothamMediumItalic</Text>
            </View>
        </>
    );
}