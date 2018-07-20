import React from 'react'
import 'react-native'
import { ShowResult } from './ShowResult'


import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import { data } from '../utils/mockData'


describe('[Component] Deck', () => {
    const restartQuiz = jest.fn();
    const deck = data['JavaScript']; //javascript deck
    const deckNoCards = data['React'];
    deckNoCards.questions = []
    // const deckWithNoCards = {"newDeck": {"questions": [], "title": "new Deck"}} 

    it('should show a message saying the score and two buttons: restart quiz and back to deck', () => {
        const score = 0;
        const rendered = renderer.create(
            <ShowResult score={score} singleDeck={deck} restartFunc={restartQuiz} />
        ).toJSON();
        expect(rendered).toMatchSnapshot();
    });

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
        let rendered = renderer.create(
            <ShowResult score={score} singleDeck={deck} restartFunc={restartQuiz} />
        ).getInstance();
        // expect(rendered.).toBeCalled();
        // expect(rendered.props.restartFunc).toBeTruthy();
        // expect(rendered.props.restartFunc).toBeCalled();
        console.log(rendered.props.restartFunc)
        // tree.find('TouchableOpacity').forEach( button => console.log(button))
        // expect(tree).toMatchSnapshot();
    });

});