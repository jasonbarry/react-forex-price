// @flow
import ReactDOM from 'react-dom';

import Demo from './Demo.jsx';

ReactDOM.render(
  <Demo />, 
  // flow-disable-next-line
  document.querySelector('#react-root'),
);
