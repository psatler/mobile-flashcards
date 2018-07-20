// import { configure } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'

// configure({ adapter: new Adapter() })


/**
 * NOT WORKING EVEN THOUGH ADDING THE FOLLOWING CONFIG TO PACKAGE.JSON
 * "jest": {
    "preset": "jest-expo",
    "setupTestFrameworkScriptFile": "./setupTests.js" <<<<<<<<<<<<<<< THIS ONE
  },

  Even with this configuration, I was getting this error:
  Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none. To
          configure an adapter, you should call `Enzyme.configure({ adapter: new Adapter() })`
          before using any of Enzyme's top level APIs, where `Adapter` is the adapter
          corresponding to the library currently being tested. For example:

          import Adapter from 'enzyme-adapter-react-15';


 */