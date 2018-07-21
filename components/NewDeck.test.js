import React from 'react'
import { NewDeck } from './NewDeck'
import { ImagePicker, Permissions } from 'expo'
import renderer from 'react-test-renderer';
// import ShallowRenderer from 'react-test-renderer/shallow';

//###### ENZYME STUFF
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
import { shallow } from 'enzyme'

describe('[Component] New Deck', () => {

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

    xit('should call askPermission method', async () => {
        jest.mock('expo', ()=>({
            Permissions: {
               askAsync: jest.fn().mockImplementationOnce(() => ({ status: 'granted' }))
            }
          }))

        const wrapper = shallow(<NewDeck />);
        const res = await wrapper.instance().askPermission();
        console.log('res', res)
    })
    
});