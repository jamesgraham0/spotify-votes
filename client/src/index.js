import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './styles.css';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// The <Provider> component makes the Redux store available to any nested components that need to access the Redux store https://react-redux.js.org/api/provider
// StrictMode is a dev tool used for highlighting problematic code in React