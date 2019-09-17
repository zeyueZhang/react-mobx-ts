import React from 'react';
import './App.css';
import Routes from './routes';
import { Provider } from 'mobx-react';
import stores from './stores/index';

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <Routes />
    </Provider>
  );
}

export default App;
