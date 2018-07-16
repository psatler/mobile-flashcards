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
import { white, blue, lightBlue, darkBlue } from './colors';

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
        const { animatedValue } = this.state;
        const { showFront } = this.props; //it has the same value as the isQuestion state var from StartQuiz component

        const frontAnimatedStyle = {
          transform: [
            { rotateY: animatedValue.interpolate({
                inputRange: [0, 180],
                outputRange: ['0deg', '180deg'],
              })
            }
          ],
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
              }) 
            }
          ],
          opacity: animatedValue.interpolate({  //adding this so it won't be mirrored on Android devices
                inputRange: [89, 90], 
                outputRange: [0, 1] 
            }), 
        }
        
        return (

            <View style={styles.container} >
                    {/* <View style={{flex: 0.5}}></View> */}

                    {showFront === true ? (
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <Text style={styles.flipText}>
                            {this.props.questionText}
                        </Text>
                    </Animated.View>
                    ) : (
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <Text style={styles.flipText}>
                            {this.props.answerText}
                        </Text>
                    </Animated.View>
                    )}
               
                {/* <View style={{flex: 0.5}}></View> */}

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
        flex: 1, //to make it fill the majority of the space available
    },
    flipCard: {
        flex: 1,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        borderColor: darkBlue,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: lightBlue,
        backfaceVisibility: 'hidden', //it means when the card rotates out of the way, it won't be visible. When it rotates back, it'll be visible again. Not working on Android though, so it was added an workaround for this above
    },
    flipCardBack: {
        borderColor: lightBlue,
        borderWidth: 2,
        backgroundColor: darkBlue,
        top: 0,
    },
    flipText: {
        textAlign: 'center',
        fontSize: 0.075*width, //workaround to fit on small screens taking a percentage of the screen width
        color: white,
    },
    switchButton: {
        alignSelf: 'center',
        backgroundColor: white,
        padding: 10,
        borderWidth: 1,
        borderColor: blue,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
    },
});