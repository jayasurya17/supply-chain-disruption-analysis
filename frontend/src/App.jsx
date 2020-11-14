import React from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Welcome from './components/Common/Welcome';

import backendURL from './constants/connection'

axios.defaults.baseURL = `${backendURL}`;

//App Component
const App = () => (
  <BrowserRouter>
    <Switch>
    <Route path="/welcome" component={Welcome} exact={true} />
      <Route component={Main} path="/" />
    </Switch>
  </BrowserRouter>
);
//Export the App component so that it can be used in index.js
export default App;
