import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import EditTemplate from './containers/editTemplate/EditTemplate';
import Themes from './containers/themes/Themes';
import EditTheme from './containers/themes/components/EditTheme';
import Home from './containers/Home';
import Layout from './components/layout';
import Categories from './containers/categories/categories';

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
					<Layout>
						<Route exact path="/" component={ Home } />
						<Route exact path="/edit-template" component={ EditTemplate } />
						<Route exact path="/themes" component={ Themes } />
						<Route exact path="/edit-theme/:id" component={ EditTheme } />
						<Route exact path="/edit-theme" component={ EditTheme } />
						<Route exact path="/categories" component={ Categories } />
					</Layout>
				</Router>
			</Provider>
		);
	}
}

export default App;
