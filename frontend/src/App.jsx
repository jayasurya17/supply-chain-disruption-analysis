import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';


import backendURL from './constants/connection'
import './App.css';
import Main from './components/Main';

axios.defaults.baseURL = `${backendURL}`;
axios.defaults.withCredentials = true;

//App Component
const App = () => (
	<BrowserRouter>
		<Switch>
			<Route component={Main} path="/" />
		</Switch>
  	</BrowserRouter>
);
//Export the App component so that it can be used in index.js
export default App;
