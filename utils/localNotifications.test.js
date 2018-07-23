import { setLocalNotification, clearLocalNotification } from './localNotifications'

// import { AsyncStorage } from 'react-native'
// import { Notifications, Permissions } from 'expo'

// const FLASHCARDS_NOTIFICATIONS_KEY = 'Flashcards:localNotifications'

jest.mock('expo', () => {
    return {
        Permissions: {
            askAsync: jest.fn(() => ({ status: 'granted' })),
        },
        Notifications: {
            cancelAllScheduledNotificationsAsync: jest.fn(),
            scheduleLocalNotificationAsync: jest.fn(),
        }
    }
});



describe('[Local Notifications] Tests', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    xit('testing creating Local Notifications', () => {
        const createLocal = setLocalNotification();
        // expect(createLocal).toBeTruthy()
    });

});