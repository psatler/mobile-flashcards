import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import { white, blue } from './colors';



export default class FlipCardAnimation extends Component {

    state = {
        animatedValue: new Animated.Value(0),
        listenerValue: 0,
    }

    componentDidMount(){
        const { animatedValue } = this.state;

        //creating a listener to track values changes
        animatedValue.addListener( ( { value } ) => {
            this.setState({
                listenerValue: value,
            })
        })
    }

    flipCard = () => {
        const { animatedValue, listenerValue } = this.state;

        if(listenerValue >= 90){
            Animated.spring(animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
              }).start();
        } 
        else {
            Animated.spring(animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
              }).start();
        }
    }

    render() {
        const { animatedValue, listenerValue } = this.state;
        const { showFront } = this.props;
        // console.log('isQuestion', showFront)

        const frontAnimatedStyle = {
          transform: [
            { rotateY: animatedValue.interpolate({
                inputRange: [0, 180],
                outputRange: ['0deg', '180deg'],
              })
            }
          ],
          //adding opacity so the back face won't be mirrored on Android devices
        //https://github.com/facebook/react-native/issues/1973#issuecomment-262059217
          opacity: animatedValue.interpolate({ //adding this so it won't be mirrored on Android devices
                inputRange: [89, 90],
                outputRange: [1, 0]
            }), 
        }
        const backAnimatedStyle = {
          transform: [
            { rotateY: animatedValue.interpolate({
                inputRange: [0, 180],
                outputRange: ['180deg', '360deg'],
                // outputRange: ['180deg', '0deg']
              }) 
            }
          ],
          opacity: animatedValue.interpolate({  //adding this so it won't be mirrored on Android devices
                inputRange: [89, 90], 
                outputRange: [0, 1] 
            }), 
        }
        
        return (

            <View >
                <View style={styles.container} >
                    {showFront === true ? (
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <Text style={styles.flipText}>
                        {/* This text is flipping on the front. */}
                            {this.props.questionText}
                        </Text>
                    </Animated.View>
                    ) : (
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <Text style={styles.flipText}>
                        {/* This text is flipping on the back. */}
                            {this.props.answerText}
                        </Text>
                    </Animated.View>
                    )}
                </View>

                {/* <TouchableOpacity 
                    onPress={() => this.flipCard()}
                    style={styles.switchButton}    
                >
                    <Text>Flip!</Text>
                </TouchableOpacity> */}
            </View>
        );
      }
    }

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        // flex: 1, //to make it fill the majority of the space available
        // alignItems: 'center',
        // justifyContent: 'center',
        
    },
    flipCard: {
        // flex: 1,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        borderColor: 'black',
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: 'blue',
        backfaceVisibility: 'hidden', //it means when the card rotates out of the way, it won't be visible. When it rotates back, it'll be visible again. Not working on Android though, so it was added an workaround for this above
    },
    flipCardBack: {
        backgroundColor: "red",
        // position: "absolute",
        top: 0,
    },
    flipText: {
        // width: 90,
        textAlign: 'center',
        fontSize: 0.075*width, //workaround to fit on small screens
        color: 'white',
        // fontWeight: 'bold',
    },
    switchButton: {
        alignSelf: 'center',
        backgroundColor: white,
        padding: 10,
        // width: 100,
        borderWidth: 1,
        borderColor: blue,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
    },
});