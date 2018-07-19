import React from 'react';
// import { Platform } from 'react-native'
import Deck from './Deck';
import { data } from '../utils/mockData'

import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';


describe('[Component] Deck', () => {
    const singleDeck = data['JavaScript'];
    const deckWithImage = data['React'];
    deckWithImage.image = '../assets/reactNativeWhiteBackground.png'
    

    it('renders correctly - no image from camera roll inserted', () => {
        const rendered = renderer.create(
            <Deck 
                deckName={singleDeck.title}
                deckSize={singleDeck.questions.length}
            />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('renders correctly - with image from camera roll inserted', () => {
        const rendered = renderer.create(
            <Deck 
                deckName={deckWithImage.title}
                deckSize={deckWithImage.questions.length}
                imageURI={deckWithImage.image}
            />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('renders user shallow correctly', () => {
        const renderer = new ShallowRenderer();
        renderer.render(
            <Deck 
                deckName={singleDeck.title}
                deckSize={singleDeck.questions.length}
                imageURI={singleDeck.image}
            />);
        const tree = renderer.getRenderOutput();
        expect(tree).toMatchSnapshot();
      });

    //#### MOCK NO WORKING =( 
    xit('Testing for Android branch in styles - it should be border of value 2', () => {
        jest.mock('Platform', () => {
            const Platform = require.requireActual('Platform');
            Platform.OS = 'android';
            return Platform;
        });

        const rendered = renderer.create(
            <Deck 
                deckName={singleDeck.title}
                deckSize={singleDeck.questions.length}
            />).toJSON();
        expect(rendered).toMatchSnapshot();
    });
});


/**
 * $ 
 *  npm install --save-dev react-dom react-addons-test-util
    npm WARN notice Due to a recent security incident, all user tokens have been invalidated. Please see https://status.npmjs.org/incidents/dn7c1fgrr7ng for more details. To generate a new token, visit https://www.npmjs.com/settings/~/tokens or run "npm login".
    npm ERR! code E404
    npm ERR! 404 Not Found: react-addons-test-util@latest

    npm ERR! A complete log of this run can be found in:
    npm ERR!     C:\Users\Pablo\AppData\Roaming\npm-cache\_logs\2018-07-19T21_16_41_344Z-debug.log
 */
