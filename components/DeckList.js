import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Platform, Animated, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Deck from './Deck'
import { getDecks, deleteAllDecks } from '../utils/asyncDB'

//redux stuff
import { connect } from 'react-redux'
import { retrieveDecks, removeAllDecks } from '../actions'
import { lightBlue, white } from '../utils/colors';


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
        // scrollY: new Animated.Value(
        //     // iOS has negative initial scroll value because content inset...
        //     Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0 ),

    }

    showDeleteConfirmation = () => {
        Alert.alert(
            'Delete All Decks',
            'Do you really want to delete the whole list of decks?',
            [
            //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => {}, style: 'cancel'},
              {text: 'OK', onPress: () => this.removeDeck()},
            ],
            { cancelable: false }
          )
    }


    removeDeck = () => {
        //update redux
        this.props.dispatch(removeAllDecks())

        //delete from DB
        deleteAllDecks()

        //go to main page
        // this.props.navigation.navigate('DeckList')
        // this.props.navigation.goBack();
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
                            },
                        ],
                    )}
                
                >
                    <View style={styles.scrollViewContent} > 

                        {Object.keys(decks).map( (key) => {
                            const { title, questions, image } = decks[key];
                            // console.log('image: ', image)
                            
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
                                        imageURI={image}
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
                        {/* <View style={ {flex: 1, }} ></View> */}

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

                    <View style={styles.headerIcon} >
                        <TouchableOpacity onPress={this.showDeleteConfirmation} >
                            <MaterialIcons name='delete' size={30} color={white}  />
                        </TouchableOpacity>
                    </View>

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
        // flex: 1,
        // flexDirection: 'row',
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
        // flex: 1,
        backgroundColor: 'transparent',
        color: white,
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
        // iOS uses content inset, which acts like padding.
        // paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0, 
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
    headerIcon: {
        // flex: 1,
        alignSelf: 'flex-end',
        top: 10,
        right: 10,
    }
});

export default connect(mapStateToProps)(DeckList);

