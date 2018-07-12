import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';

export default class AnimatedBasic extends Component {

    state = {
        animatedValue: new Animated.Value(0),
        listenerValue: 0,
    }

    componentDidMount(){
        const { animatedValue, listenerValue } = this.state;

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
              //   outputRange: ['180deg', '360deg'],
                outputRange: ['180deg', '0deg']
              }) 
            }
          ],
          opacity: animatedValue.interpolate({  //adding this so it won't be mirrored on Android devices
                inputRange: [89, 90], 
                outputRange: [0, 1] 
            }), 
        }
        
        return (
          <View style={styles.container}>
            <View>
              <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <Text style={styles.flipText}>
                  This text is flipping on the front.
                </Text>
              </Animated.View>
              <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                <Text style={styles.flipText}>
                  This text is flipping on the back.
                </Text>
              </Animated.View>
            </View>
            <TouchableOpacity onPress={() => this.flipCard()}>
              <Text>Flip!</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden', //it means when the card rotates out of the way, it won't be visible. When it rotates back, it'll be visible again. Not working on Android though, so it was added an workaround for this above
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
});