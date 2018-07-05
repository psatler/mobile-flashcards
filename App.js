import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import Tabs from './components/NavigationTabs'
import CustomStatusBar from './components/CustomStatusBar'



export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor={'purple'} barStyle='light-content' />
        <Tabs />

        {/* <Text>Opening up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gray',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
