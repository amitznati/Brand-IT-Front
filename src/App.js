import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import EditTemplate from './containers/editTemplate/EditTemplate';
import Home from './containers/Home';
import Header from './components/Header';
import SideBar from './components/SideBar';

if(localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if(decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store = { store }>
				<Router>
					<div>
						<Header />
						<SideBar />
						<Route exact path="/" component={ Home } />
						<Route exact path="/edit-template" component={ EditTemplate } />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
