import React from 'react';
import { View } from 'react-native'

const LineDivider = () => {
    return (
        <View style={{ width: 0, paddingVertical: 20 }}>
            <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
        </View>
    );
}

export default LineDivider;