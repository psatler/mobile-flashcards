import React from 'react'
import ConnectedDeckList, { DeckList } from './DeckList' 
import { data } from '../utils/mockData'


//####################################### ENZYME STUFF
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
import { shallow, mount } from 'enzyme'

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



describe('[Component] DeckList', () => {
    const navigation = { navigate: jest.fn() }; //as shown here https://stackoverflow.com/questions/46090713/testing-component-that-uses-react-navigation-with-jest/46114589

    it('shallow renders ConnectedDeckList correctly', () => {        
        const wrapper = shallow(
            // <ConnectedDeckList navigation={navigationMock} />,
            <ConnectedDeckList  />,
            { context: { store: storeMock } },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });


    it('shallow renders Unconnected DeckList correctly', () => {        
        const wrapper = shallow(<DeckList />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders List of Decks correctly', () => {        
        const wrapper = shallow(<DeckList decks={data} />);
        wrapper.setState({ isLoading: true}) //setting a new state to test another part of the code
        expect(wrapper).toMatchSnapshot();
    });

    it('presses the touchableOpacity going to DeckDetail screen', () => {
        const wrapper = shallow(<DeckList decks={data} navigation={navigation}  />);
        wrapper.setState({ isLoading: true}) //
        wrapper.find('TouchableOpacity').first().props().onPress()
        expect(navigation.navigate).toHaveBeenCalledTimes(1);
    });

    it('calls the showDeleteConfirmation method', () => {
        const wrapper = shallow(<DeckList decks={data} navigation={navigation}  />);
        wrapper.setState({ isLoading: true}) //
        wrapper.find('TouchableOpacity').last().props().onPress() //this is the showDeleteConfirmation method (the last touchableOpacity)
        expect(navigation.navigate).toHaveBeenCalledTimes(1);
    });

    // it('calls getDecks method inside componentDidMount', () => {
    //     // console.log(DeckList.prototype)
    //     const spy = jest.spyOn(DeckList.prototype, 'getDecks');
    //     const wrapper = mount(<DeckList decks={data} navigation={navigation}  />);
    //     wrapper.instance().getDecks();
    //     expect(spy).toHaveBeenCalled();
    // })
});


