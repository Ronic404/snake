import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import { store } from './redux/store';

const GlobalStyles = createGlobalStyle`
  body {
    width: 800px;
    margin: auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
    background: #15a2e4;
  }

  * {
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById('root')
);
