import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Ionicons, EvilIcons } from '@expo/vector-icons'
import { white } from '../utils/colors';
import { withNavigation } from 'react-navigation';

class ShowResult extends Component {


    render() {
        const { score, total } = this.props;

        return (
            <View style={styles.container} >
                <View style={{flex: 0.5}}></View> 

                <View style={styles.resultsContainer}>
                    <Text style={styles.screenTitle} > Final Result </Text>
                    <Text style={styles.resultMessage} > You've Got {score} out of {total} points possible! </Text>

                    <View style={styles.buttonsContainer} >
                        <TouchableOpacity 
                            style={ { 
                                alignItems: 'center', 
                                } }
                            onPress={ () => this.props.navigation.goBack()}        
                        >
                            <EvilIcons name={'redo' } size={50}  />
                            <Text> Redo Quiz </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={ { 
                                alignItems: 'center', 
                                } }
                            onPress={ () => this.props.navigation.navigate('DeckList')}        
                        >
                            <Ionicons name={Platform.OS === 'ios' ? 'ios-home' : 'md-home' } size={50}  />
                            <Text> Home </Text>
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
        backgroundColor: white,
    },
    screenTitle: {
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    resultMessage: {
        fontSize: 15,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly' ,
        alignItems: 'center',
        marginTop: 30,
    }


})

export default withNavigation(ShowResult); //using withNavigation HoC so we can access the navigation props