import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Platform, Animated, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Deck from './Deck'
import { getDecks } from '../utils/asyncDB'

//redux stuff
import { connect } from 'react-redux'
import { retrieveDecks } from '../actions'
import { lightBlue } from '../utils/colors';


//############## Scrollable Header Constants ##############
const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


class DeckList extends Component { //DeckList is the main screen (initial route)

    componentDidMount(){

        getDecks() //async function to get decks from AsyncStorage 
            .then( (decks) => this.props.dispatch(retrieveDecks(decks)) )
            .then( () => {
                this.setState({ isLoading: true })
            }
        )
        //update redux
    }

    state = {
        isLoading: false, //data is not ready yet to be displayed
        scrollY: new Animated.Value(0),

    }

    

    render() {
        const { isLoading, scrollY } = this.state;
        const { decks } = this.props; // decks come from mapStateToProps

        // console.log('object keys ',Object.keys(decks))

        // #### for header animation ####
        const headerHeight = scrollY.interpolate( { //this is used below so the height changes as the user scrolls
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });

        // #### for header background animation (image) ####
        const imageOpacity = scrollY.interpolate( {
            inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0], //opacity decays after the header has been halfway scrolled (because of the 3rd break point)
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        })

        // for header title
        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 0],
            extrapolate: 'clamp',
        });

        // const iconScale = scrollY.interpolate({
        //     inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        //     outputRange: [0, 0, 1],
        //     extrapolate: 'clamp',
        // });

        
        if(!isLoading){
            return (
                // Insert AppLoading Component from Expo here
                <View>
                    <Text>Loading</Text> 
                </View>
            )
        }

        // data is from the mockData array
        return (
            <View style={ {flex: 1} } >

                <ScrollView 
                    style={styles.container} 
                    //adding properties below to trigger animation
                    scrollEventThrottle={16}
                    onScroll={ Animated.event(
                        [ 
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        y: scrollY,
                                    }
                                }
                            }
                        ]
                    )}
                
                >
                    <View style={styles.scrollViewContent} > 

                        {Object.keys(decks).map( (key) => {
                            const { title, questions } = decks[key];
                            
                            return (
                                <TouchableOpacity
                                    key={key} 
                                    onPress={ () => this.props.navigation.navigate('DeckDetail', {
                                        deckTitle: title,
                                        deckLength: questions.length
                                    })}
                                >
                                    <Deck 
                                        key={key}
                                        deckName={title}
                                        deckSize={questions.length}
                                    />
                                </TouchableOpacity>
                                
                            )
                        })}

                    </View>

                </ScrollView>


                {/* ####################### ANIMATED HEADER ####################### */}
                <Animated.View  
                    style={[
                        styles.header, 
                        { 
                            height: headerHeight //this value is interpolated above, so it changes as the user scrolls, adjusting the size of the header
                        }
                    ]}>

                    {/* ############### Header Background Image ############### */}
                    <Animated.Image 
                        style={[
                            styles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [ { translateY: imageTranslate,} ]
                            }
                        ]}
                        source={ require('../assets/reactNativeLightBlueBackground.png')}
                    />


                    <Animated.View style={styles.bar} >
                        <Animated.Text style={[
                            styles.title, 
                            {
                                transform: [ { scale: titleScale }, 
                                    // { translateY: titleTranslate,} 
                                ]
                            }
                            ]}
                        >
                            Home
                        </Animated.Text>

                        {/* <Animated.View style={[
                            styles.headerIcon,
                            {
                                transform: [
                                    { scale: iconScale, }
                                ]
                            }
                        ]}>
                            <TouchableOpacity>
                                <MaterialIcons name='settings' size={30}  />
                            </TouchableOpacity>

                        </Animated.View> */}
                        

                    </Animated.View>
                </Animated.View>
                {/* ########## ANIMATED HEADER */}

                
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        decks: state.deckReducer,
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute', //using absolute to place header over scrollview. Below we add some margin top to scroll view so it won't be below header
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: lightBlue, //same color of the image background
        overflow: 'hidden',
    },
    bar: {
        // flexDirection: 'row',
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        // flex: 1,
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT, 
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_MAX_HEIGHT,
        width: null,
        resizeMode: 'cover',
    },
    // headerIcon: {
    //     position: 'absolute',
    //     left: screenWidth,
    // }
});

export default connect(mapStateToProps)(DeckList);

