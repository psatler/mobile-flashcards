// import React, { Component } from 'react'
// import { Text, View, StyleSheet, TextInput, 
//     Platform, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native'
// import { gray, white } from '../utils/colors';

// import { saveDeckTitle } from '../utils/asyncDB'
// import { connect } from 'react-redux'
// import { addDeck } from '../actions'
// import { NavigationActions } from 'react-navigation'

// class NewDeck extends Component {

//     //local state for handling form inputs
//     state = {
//         input: '',
//     }

//     handleTextChange = (deckTitle) => {
//         this.setState({
//             input: deckTitle,
//         })
//     }

//     toHome = () => {
//         this.props.navigation.navigate('DeckList')
//         // this.props.navigation.dispatch(NavigationActions.back({
//         //     key: 'DeckList',
//         // }))
//     }

//     submitDeck = () => {
//         const { input } = this.state;

//         if(input){
//             const deck = {
//                 title: input,
//                 questions: [],
//             }

//             const keyTitle = input.split(' ').join(''); //taking out the spaces to store key without'em

//             //update redux
//             this.props.dispatch(addDeck({ [keyTitle]: deck }));

//             //reset state
//             this.setState({
//                 input: '',
//             })

//             //go back to home
//             this.toHome(); //which is DeckList component

//             //save to DB (async storage)
//             saveDeckTitle(keyTitle, deck);
//         }

//         // alert('This was the input: ' + input);
//     }

//     render() {
//         const { input } = this.state;

//         //using keyboardAvoidingView to avoid keyboard hiding other views (buttons, textInputs, etc)
//         return (
//             <KeyboardAvoidingView style={styles.container} behavior='padding'>
//                 <Text style={styles.headline}> What's is the title of your new deck? </Text>
//                 <TextInput 
//                     value={input}
//                     placeholder={'Deck Title'}
//                     style={styles.textInputStyle}
//                     onChangeText={this.handleTextChange}
//                 />

//                 <TouchableOpacity style={styles.submitButton} onPress={this.submitDeck}>
//                     <Text style={styles.submitButtonText} > Submit </Text>
//                 </TouchableOpacity>
//             </KeyboardAvoidingView>
//         )
//     }
// }

// const window = Dimensions.get('window');
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 10,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     headline: {
//         textAlign: 'center',
//         fontSize: 40,
//         // marginTop: 15,
//     },
//     textInputStyle: {
//         // flex: 1,
//         paddingLeft: 15,
//         marginTop: 30,
//         height: 50,
//         borderColor: gray,
//         borderWidth: 1,
//         borderRadius: Platform.OS === 'ios' ? 16 : 2,
//         width: window.width - 30,
//     },
//     submitButton: {
//         // alignItems: 'center',
//         marginTop: 25,
//         padding: 10,
//         borderRadius: Platform.OS === 'ios' ? 16 : 2,
//         backgroundColor: 'black',
//     },
//     submitButtonText: {
//         fontSize: 15,
//         color: white,
//         padding: 5,
//     }
// });

// export default connect()(NewDeck);





import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE], //maximum distance allowed to 
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        {/* <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        /> */}
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            // source={require('./assets/cat.jpg')}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          <Text style={styles.title}>Title</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});