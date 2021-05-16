import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';

const GlobalStyles = createGlobalStyle`
  body {
    width: 800px;
    margin: auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
  }

  * {
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('root')
);
