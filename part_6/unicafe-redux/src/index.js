import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const GOOD = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };
  const OK = () => {
    store.dispatch({
      type: 'OK',
    });
  };
  const BAD = () => {
    store.dispatch({
      type: 'BAD',
    });
  };
  const ZERO = () => {
    store.dispatch({
      type: 'ZERO',
    });
  };

  return (
    <div>
      <button onClick={GOOD}>Good</button>
      <button onClick={OK}>OK</button>
      <button onClick={BAD}>Bad</button>
      <button onClick={ZERO}>Reset</button>
      <div>Good: {store.getState().good}</div>
      <div>OK: {store.getState().ok}</div>
      <div>Bad: {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
