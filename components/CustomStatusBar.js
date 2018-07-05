import React from 'react'
import { Constants } from 'expo'
import { View, StatusBar } from 'react-native'

//wrapping the status bar so we can better customize it

const CustomStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}} >
            <StatusBar translucent backgroundColor={backgroundColor} {...props} /> 
        </View>
    )
}

export default CustomStatusBar;