# Mobile Flashcards
> Final assessment project for Udacity's React Native course, in order to demonstrate understanding of the basics of React Native

Mobile Flashcards is an app which allows the users study a collection of flashcards. Users can create different categories of flashcards called "Decks", also being able to add cards and do quizzes on these decks. 

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Demo
Open your [Expo App](https://expo.io/) and scan the QR code below to experience Mobile Flashcards on your phone. More details on the [project's expo page](https://expo.io/@psatler/mobileflashcards).

![Expo QR Code](/assets/expo_qrCode.PNG)

## TL;DR

To run this project in your phone device (this assumes you have Expo installed):

```
  git clone https://github.com/psatler/mobile-flashcards.git
  cd mobile-flashcards
  npm install
  npm start
```

  Make sure your phone and PC are both on the same wireless network. So, to guarantee the app will run on your phone device, override the IP address/hostname that is detected by Create React Native App doing the following before running `npm start`:

  * Specify your own hostname via the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable. So, if your IPv4 wi-fi address was `192.168.XX.XX`, for example, you'd do

    Mac and Linux:
  
    ```
    REACT_NATIVE_PACKAGER_HOSTNAME='192.168.XX.XX' npm start
    ```

    Windows:
    ```
    set REACT_NATIVE_PACKAGER_HOSTNAME='192.168.XX.XX'
    npm start
    ```

To run tests, instead of `npm start`, you should use `npm test` or `npm test -- --coverage` to see the coverage report at the end. **NOTE:** For testing, I had to also install `react-dom` to make use of some `enzyme` methods in CRNA.

## Where this project was tested on

- Iphone 5
- Moto G (Android 6.0) 1280x720
- Tablet Dell Venue 8 (Android 4.4.2)


## Some Features

Using Mobile Flashcards...

- A user can add a deck to a list of decks. Also, add a card to a specific deck, and test himself/herself doing quiz. 
- At the main screen there is an animated header which shrinks as the user scrolls up (it has to have several decks to see this effect happen).
- At the _Add New Deck_ screen, the user can also insert an image avatar from camera roll (the user needs to grant permission to camera roll).
- There is also a `local notification`, which is fired at **10 AM daily** to remember the user to study a quiz if he hasn't done this yet. When the user completes a quiz, the nofication is cancelled and re-scheduled for the following day at 10 AM again.
- At the _Quiz_ screen is used a _flip card animation_ created with the **Animated API** from React Native. The code is at `/utils/flipCardAnimation.js`. 
- A single deck can be deleted as well as the whole list of decks. 

## Main Dependencies

* [React-Native:](https://facebook.github.io/react-native/) Build native mobile apps using JavaScript and React
* [Expo:](https://expo.io/learn) Free and open source toolchain built around React Native to help you build native iOS and Android projects using JavaScript and React
* [Redux:](https://redux.js.org/) A predictable state container for JavaScript apps.
* [React-redux:](https://github.com/reduxjs/react-redux) Official React bindings for Redux
* [Redux-Thunk:](https://github.com/reduxjs/redux-thunk) Thunk middleware for Redux
* [React-Navigation:](https://reactnavigation.org/) Routing and navigation for your React Native apps
* [React-Native-Progress:](https://github.com/oblador/react-native-progress) Progress indicators and spinners for React Native using ReactART.
* [Jest Unit Testing:](https://jestjs.io/) Delightful JavaScript Testing developed by Facebook
* [Enzyme JS Testing Utility:](http://airbnb.io/enzyme/) Developed by Airbnb to make it easier to assert React Components. 



