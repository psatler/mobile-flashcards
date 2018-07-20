import React from 'react'
import 'react-native'
import { ShowResult } from './ShowResult'
import { data } from '../utils/mockData'

import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

//###### ENZYME STUFF
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
import { shallow } from 'enzyme'



describe('[Component] Deck', () => {
    const restartQuiz = jest.fn();
    const deck = data['JavaScript']; //javascript deck
    const deckNoCards = data['React'];
    deckNoCards.questions = []
    // const deckWithNoCards = {"newDeck": {"questions": [], "title": "new Deck"}} 

    //passing a deck with cards
    it('should show a message saying the score and two buttons: restart quiz and back to deck', () => {
        const score = 0;
        const rendered = renderer.create(
            <ShowResult score={score} singleDeck={deck} restartFunc={restartQuiz} />
        ).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    //passing a deck without cards (empty)
    it('should show a message saying there is no cards inside deck and display only one button: back to deck', () => {
        const score = 0;
        const renderer = new ShallowRenderer();
        renderer.render(
            <ShowResult score={score} singleDeck={deckNoCards} restartFunc={restartQuiz} />
        );
        const tree = renderer.getRenderOutput();
        expect(tree).toMatchSnapshot();
    });

    it('should show a call the restart button', () => {
        const score = 0;
        const wrapper = shallow(
            <ShowResult score={score} singleDeck={deck} restartFunc={restartQuiz} />
        );

        wrapper.find('TouchableOpacity').first().props().onPress()
        expect(restartQuiz).toHaveBeenCalled();

        // console.log(wrapper.find('TouchableOpacity').first().props().onPress())

    });

    it('should show a call the back to deck button', () => {
        const score = 0;
        const navigation = { navigate: jest.fn() }; //mocking navigate function of react navigation and passing it as props to the component that uses it

        const wrapper = shallow(
            <ShowResult score={score} singleDeck={deck} restartFunc={restartQuiz} navigation={navigation} />
        );

        wrapper.find('TouchableOpacity').last().props().onPress()
        expect(navigation.navigate).toHaveBeenCalled();
        
        // console.log(wrapper.find('TouchableOpacity').last().props().onPress())

    });


});