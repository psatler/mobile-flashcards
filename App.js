import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
//redux stuff
import { Provider } from 'react-redux'
import store from './store'

import { setLocalNotification } from './utils/localNotifications'
import MainNavigator from './components/NavigationTabs'
import CustomStatusBar from './components/CustomStatusBar'
import { lightBlue } from './utils/colors';




export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification(); //it's being set to 10 AM (everyday)
  }

  render() {
    return (
      <Provider store={store} >
        <View style={styles.container}>
        
          <CustomStatusBar backgroundColor={lightBlue} barStyle='light-content' />
          <MainNavigator />

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
