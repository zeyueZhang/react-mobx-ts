import React from 'react';
import './App.css';
import { Route, Switch, HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react';
import stores from './stores/index';
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import Layout from './layout';
import Login from './routes/Login'

const App: React.FC = () => {
  return (
    <HashRouter basename='/'>
      <ConfigProvider locale={zh_CN}>
        <Provider {...stores}>
            <Switch>
              <Route path='/login' component={Login}/>
              <Layout />
            </Switch>
        </Provider>
      </ConfigProvider>
    </HashRouter>
  );
}

export default App;
