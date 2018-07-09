import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
//redux stuff
import { Provider } from 'react-redux'
import store from './store'

import MainNavigator from './components/NavigationTabs'
import CustomStatusBar from './components/CustomStatusBar'
import { purple } from './utils/colors';



export default class App extends React.Component {

  render() {
    return (
      <Provider store={store} >
        <View style={styles.container}>
          <CustomStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />

          {/* <Text>Opening up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text> */}
        </View>
      </Provider>
      
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
