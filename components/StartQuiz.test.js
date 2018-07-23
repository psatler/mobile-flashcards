import React from 'react'
import StartQuiz from './StartQuiz'
import { data } from '../utils/mockData'
import renderer from 'react-test-renderer';

//###### ENZYME STUFF
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
import { shallow } from 'enzyme'


describe('[Component] StartQuiz', () => {
    let deckMock, navigationMock

    beforeEach( () => {
        //assigning tests
        deckMock = data['React'];
        navigationMock = { state: { params: { deck: deckMock } } } //passing one deck as prop (as it was coming from navigation.state.params.deck)
    })    

    it('shallow renders correctly', () => {
        const wrapper = shallow(<StartQuiz navigation={navigationMock} />);
        expect(wrapper).toMatchSnapshot()
    });

    it('should toggle state property "isQuestion" to true or false', () => {
        const wrapper = renderer.create(<StartQuiz navigation={navigationMock} />).getInstance();
        expect(wrapper.state.isQuestion).toBeTruthy();
        wrapper.toggleQuestionAnswer();
        expect(wrapper.state.isQuestion).toBeFalsy();
        wrapper.toggleQuestionAnswer();
        expect(wrapper.state.isQuestion).toBeTruthy();
    });

    it('calls rightAnswer method', () => {
        const wrapper = renderer.create(<StartQuiz navigation={navigationMock} />).getInstance();
        expect(wrapper.state.currentIndex).toEqual(0);
        expect(wrapper.state.score).toEqual(0);
        wrapper.rightAnswer();
        expect(wrapper.state.currentIndex).toEqual(1);
        expect(wrapper.state.score).toEqual(1);
    });

    it('calls wrongAnswer method', () => {
        const wrapper = renderer.create(<StartQuiz navigation={navigationMock} />).getInstance();
        expect(wrapper.state.currentIndex).toEqual(0);
        expect(wrapper.state.score).toEqual(0);
        wrapper.wrongAnswer();
        expect(wrapper.state.currentIndex).toEqual(1);
        expect(wrapper.state.score).toEqual(0);
    });

    it('calls restartQuiz method', () => {
        const wrapper = renderer.create(<StartQuiz navigation={navigationMock} />).getInstance();
        wrapper.restartQuiz();
        expect(wrapper.state.isQuestion).toBeTruthy();
        expect(wrapper.state.currentIndex).toEqual(0);
        expect(wrapper.state.score).toEqual(0);
    });

    //############## Doing a mock below ###########
    it('should return there is no cards message', () => {
        deckMock = data['React'];
        deckMock.questions = []; //no cards
        navigationMock = { state: { params: { deck: deckMock } } }
        const wrapper = shallow(<StartQuiz navigation={navigationMock} />);
        expect(wrapper).toMatchSnapshot();
    });

    xit('should display the final result message', () => {
        // const wrapper = renderer.create(<StartQuiz navigation={navigationMock} />).getInstance(); //deck has one card
        // wrapper.rightAnswer(); // so the user answer correctly
        // expect(wrapper.toJSON()).toMatchSnapshot();

        const wrapper = shallow(<StartQuiz navigation={navigationMock} />);
        wrapper.setState({ currentIndex: 3 });
        expect(wrapper).toMatchSnapshot();
    })
    
})