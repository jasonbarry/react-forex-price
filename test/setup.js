// import enzyme and make funcs global
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// fail tests if console.error users
console.error = message => {
  throw new Error(message);
};
