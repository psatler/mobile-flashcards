import React from 'react'
import ConnectedNewCard, { NewCard } from './NewCard'
import { data } from '../utils/mockData'

import renderer from 'react-test-renderer';

//####################################### ENZYME STUFF
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
import { shallow } from 'enzyme'

//####################################### REDUX MOCK STORE
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([ thunk ]);
// const initialState = data['React'];
const initialState = { }
const storeMock = mockStore(initialState);


describe('[Component] NewCard', () => {
    const mockData = data['JavaScript'];
    const navigation = {
        goBack: jest.fn(),
        state: {
            params: {
                title: mockData.title,
            }
        }
    };

    afterEach( () => {
        jest.resetAllMocks();
    })

    it('shallow renders correctly', () => {
        const wrapper = shallow(<NewCard />);
        expect(wrapper).toMatchSnapshot();
    });

    it('shows the alert message when user press submit button with blanks fields', () => {
        //####### mocking the alert method
        global.alert = jest.fn(); 
        const wrapper = shallow(<NewCard navigation={navigation}  />);
        wrapper.find('TouchableOpacity').first().props().onPress() //first touchableOpacity
        expect(global.alert).toHaveBeenCalledTimes(1);
    });

    it('adds card to deck when user press submit button', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<NewCard navigation={navigation} dispatch={dispatch} /> );
        wrapper.setState({
            questionInput: 'Testing question',
            answerInput: 'Testing answer',
        })
        wrapper.find('TouchableOpacity').first().props().onPress() //first touchableOpacity
        expect(navigation.goBack).toHaveBeenCalledTimes(1);
        // expect(wrapper.state.questionInput).toEqual('');
    });

    it('calls handleQuestionTextChange and handleAnswerTextChange', () => {
        const wrapper = shallow(<NewCard navigation={navigation}  />)
        // console.log('test', wrapper.state())
        wrapper.find('TextInput').first().props().onChangeText() //question 
        wrapper.find('TextInput').last().props().onChangeText() //answer 
    });

    xit('calls onSubmitEditing and goes to the next input field', () => {
        const wrapper = shallow(<NewCard navigation={navigation}  />)
        // console.log('test', wrapper.state())
        wrapper.find('TextInput').first().props().onSubmitEditing() //question 
        // wrapper.find('TextInput').last().props().onChangeText() //answer 
    });

    xit('adds card to deck when user press submit button', () => {
        
        const wrapper = shallow(<ConnectedNewCard navigation={navigation}  />, 
            { context: { store: storeMock } },
        );
        wrapper.setState({
            questionInput: 'Testing question',
            answerInput: 'Testing answer',
        })
        wrapper.dive().find('TouchableOpacity').first().props().onPress() //first touchableOpacity
        expect(navigation.goBack).toHaveBeenCalledTimes(1);
    });

    // xit('calls handleQuestionTextChange and handleAnswerTextChange', () => {
    //     const wrapper = shallow(<NewCard navigation={navigation}  />)
    //     console.log('test', wrapper.state())
    //     const input = wrapper.find('TextInput').first();
    //     input.simulate('change', { target: { value: 'Hello' } })
    //     wrapper.find('TextInput').first().props().onChangeText() //question 
    // });


    // it('calls getDecks method inside componentDidMount', () => {
    //     const spy = jest.spyOn(NewCard.prototype, 'submitDeck');
    //     const wrapper = shallow(<NewCard  />);
    //     wrapper.instance().submitDeck();
    //     expect(spy).toHaveBeenCalled();
    // })

    
});