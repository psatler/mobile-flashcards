// import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const FLASHCARDS_NOTIFICATIONS_KEY = 'Flashcards:localNotifications'


const createNotification = () => {
    return {
        title: 'Do a quiz today!',
        body: '👋 Do not forget to study your decks!',
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export const setLocalNotification = () => {
    //checking if our local notification has already been set
    AsyncStorage.getItem(FLASHCARDS_NOTIFICATIONS_KEY) 
        .then(JSON.parse) //parsing the returned value
        .then( (data) => {
            if(data === null){ //if we haven't any notification scheduled
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then( ({ status }) => {
                        if( status === 'granted' ){
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1) //tomorrow 
                            tomorrow.setHours(10); //scheduling for 10 AM
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(FLASHCARDS_NOTIFICATIONS_KEY, JSON.stringify(true))
                        }
                    })

            }
        })

}

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATIONS_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}