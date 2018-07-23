import React from 'react'
import { NewDeck } from './NewDeck'
import { ImagePicker, Permissions } from 'expo'
import { addDeck, ADD_DECK } from '../actions'

//###### ENZYME STUFF
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
import { shallow } from 'enzyme'

//### REDUX MOCK STORE
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([ thunk ]);
const store = mockStore({ });


jest.mock('expo', ()=>({
    Permissions: {
    //    askAsync: jest.fn(() => ({ status: 'granted' }))
       askAsync: jest.fn(() => {
           return new Promise( (resolve, reject) => {
               return resolve({
                   status: 'granted',
               })
           })
       })
    },
    ImagePicker: {
        launchImageLibraryAsync: jest.fn( () => ({
            allowsEditing: true,
            aspect: [4, 3],
        })),
    
    },
  }))

describe('[Component] New Deck', () => {

    afterEach( () => {
        store.clearActions()
        // jest.resetAllMocks();
    })

    it('shallow render correctly', () => {
        const wrapper = shallow(<NewDeck />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should press the submit button', () => {
        const wrapper = shallow(<NewDeck />);
        wrapper.instance().submitDeck();
        expect(wrapper.state("input")).toEqual('');
        expect(wrapper.state("image")).toEqual(null);

        //############ TRYING TO CREATE A SPY - NO SUCCESS ##########
        //here https://github.com/airbnb/enzyme/issues/365 it says I should've used constructor instead of arrow functions
        // const spy = jest.spyOn(NewDeck.prototype,'submitDeck');
        // const wrapper = shallow(<NewDeck />);
        // wrapper.find('TouchableOpacity').last().props().onPress()
        // expect(spy).toHaveBeenCalled();
        // console.log(NewDeck.prototype)
    });

    it('should call askPermission method, which call pickImage', async () => {
        const wrapper = shallow(<NewDeck />);
        await wrapper.instance().askPermission();
    });

    it('should call pickImage method', async () => {
        const wrapper = shallow(<NewDeck />);
        await wrapper.instance().pickImage()
        // console.log(ImagePicker.launchImageLibraryAsync);
        ImagePicker.launchImageLibraryAsync = jest.fn(() => ({
                cancelled: true,
        }))
        // console.log('after ',ImagePicker.launchImageLibraryAsync);
        await wrapper.instance().pickImage()
    });

    it('should dispatch an action to the store', async () => {
        const deck = {
            title: 'JavaScript',
            questions: [
              {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
              }
            ]
        }
        const expectedActions = [
            { type: ADD_DECK, payload: deck }
        ]

        await store.dispatch(addDeck(deck))
        expect(store.getActions()).toEqual(expectedActions);
        expect(store.getActions()).toMatchSnapshot();
    })



    xit('should call enter if statement', () => {
        const wrapper = shallow(<NewDeck />);
        // const textInput = wrapper.find('TextInput').instance().value = 'testing input'
        wrapper.find('TextInput').getDOMNode().value = 'testing input'
        // textInput.value = 'testing input'
        // console.log('after ',textInput);

        // wrapper.instance().submitDeck();
        expect(wrapper.state("input")).toEqual('testing input')
    })


    
});