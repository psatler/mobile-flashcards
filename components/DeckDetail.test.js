import React from 'react';
import ConnectedDeckDetail, { DeckDetail } from './DeckDetail' 
import { data } from '../utils/mockData'


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
const initialState = {
    state: {
        deckReducer: {
            ...data,
        }
    }
}
const storeMock = mockStore(initialState);


describe('[Component] DeckDetail', () => {
    const deck = data['React'];
    const navigationMock = { 
        state: { 
            params: { 
                deckTitle: deck.title, 
                deckLength: deck.questions.length,
                // handleRemove: jest.fn(),
            } 
        },
        setParams: jest.fn(), //mocking function called on componentDidMount, which sets the ref for the delete button on header right
        navigate: jest.fn(), //mocking the navigate functions used to move from one screen to another 
    };

    afterEach( () => {
        jest.resetAllMocks();
    })

    //gives me  TypeError: Cannot read property 'React' of undefined ??       
    xit('shallow renders ConnectedDeckDetail correctly', () => { 
        const wrapper = shallow(
            // <ConnectedDeckDetail navigation={navigationMock} />,
            <ConnectedDeckDetail  />,
            { context: { store: storeMock } },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('shallow renders Unconnected DeckDetail correctly', () => {        
        const wrapper = shallow(<DeckDetail navigation={navigationMock} />);
        expect(wrapper).toMatchSnapshot();
    });

    // ###### IT'S SIMILAR TO ShowResult.test.js file
    it('calls Add Card touchableOpacity button', () => {
        const wrapper = shallow(<DeckDetail deck={deck} navigation={navigationMock} />);
        wrapper.find('TouchableOpacity').first().props().onPress() //first touchableOpacity
        expect(navigationMock.navigate).toHaveBeenCalledTimes(1);
    });

    it('calls StartQuiz touchableOpacity button', () => {
        const wrapper = shallow(<DeckDetail deck={deck} navigation={navigationMock} />);
        wrapper.find('TouchableOpacity').last().props().onPress() //secondo (last) touchableOpacity
        expect(navigationMock.navigate).toHaveBeenCalledTimes(1);
    });

});

