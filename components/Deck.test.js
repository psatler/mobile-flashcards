import React from 'react';
import Deck from './Deck';
import { shallow } from 'enzyme';
import { data } from '../utils/mockData'

import renderer from 'react-test-renderer';


describe('[Component] Deck', () => {
    const singleDeck = data['JavaScript'];

    it('renders correctly', () => {
        const rendered = renderer.create(
            <Deck 
                deckName={singleDeck.title}
                deckSize={singleDeck.questions.length}
                imageURI={singleDeck.image}
            />).toJSON();
        expect(rendered).toMatchSnapshot();
    });


    it('shallow renders correctly', () => {
        const wrapper = shallow(
            <Deck 
                deckName={singleDeck.title}
                deckSize={singleDeck.questions.length}
                imageURI={singleDeck.image}
            />);
        expect(wrapper).toMatchSnapshot();
    })
});