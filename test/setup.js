// import enzyme and make funcs global
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import 'jest-localstorage-mock';

configure({ adapter: new Adapter() });

// silence console.error messages
console.error = message => {
  // throw new Error(message);
};
