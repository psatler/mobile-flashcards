import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Ionicons, EvilIcons } from '@expo/vector-icons'
import { white, darkBlue, lightBlue } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/localNotifications'
import { withNavigation } from 'react-navigation';

class ShowResult extends Component {

    componentDidMount(){ //when the page mounts, it means the user has completed a deck, so we need to clear the old notification and set a new one
        clearLocalNotification() 
            .then(setLocalNotification); //sets a new local notification for tomorrow 

    }

    render() {
        const { score, singleDeck } = this.props;
        const total = singleDeck.questions.length

        return (
            <View style={styles.container} >
                <View style={{flex: 0.5}}></View> 

                <View style={styles.resultsContainer}>
                    
                    { total === 0 ? ( //there is no cards inside deck
                        <View>
                            <Text style={styles.screenTitle} > There is no cards inside this deck. </Text>
                            <Text style={styles.resultMessage} > Please insert some card and do the quiz again </Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.screenTitle} > Final Result </Text>
                            <Text style={styles.resultMessage} > You've Got {score} out of {total} points possible! </Text>
                        </View>
                    )
                }

                    <View style={styles.buttonsContainer} >

                        { total !== 0 ? (
                            <TouchableOpacity 
                            style={ {alignItems: 'center' }}  
                            onPress={ () => this.props.restartFunc()}    
                            >
                                <EvilIcons name={'redo' } size={50} color={lightBlue}  />
                                <Text style={{color: lightBlue}}> Restart Quiz </Text>
                            </TouchableOpacity>
                        ) : ( null ) }

                        <TouchableOpacity 
                            style={ { 
                                alignItems: 'center', 
                                } }
                            onPress={ () => this.props.navigation.navigate('DeckDetail', {
                                deckTitle: singleDeck.title,
                                deckLength: singleDeck.questions.length
                            })}        
                        >
                            <Ionicons name={Platform.OS === 'ios' ? 'ios-home' : 'md-home' } size={50} color={lightBlue}  />
                            <Text style={{color: lightBlue}}> Back to Deck </Text>
                        </TouchableOpacity>
                    </View>
            
                </View>

                <View style={{flex: 1}}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    resultsContainer: {
        flex: 2, //to make it fill the majority of the space available
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: darkBlue,
    },
    screenTitle: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        color: lightBlue,
    },
    resultMessage: {
        fontSize: 15,
        textAlign: 'center',
        color: white,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly' ,
        alignItems: 'center',
        marginTop: 30,
    }


})

export default withNavigation(ShowResult); //using withNavigation HoC so we can access the navigation props