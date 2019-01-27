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
import EditCategory from './containers/categories/components/EditCategory';
import EditKit from './containers/kits/components/EditKit';
import Kits from './containers/kits/Kits';
import EditProduct from './containers/products/components/EditProduct';
import Products from './containers/products/Products';

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
						<Route exact path="/edit-category" component={ EditCategory } />
						<Route exact path="/edit-category:id" component={ EditCategory } />

						<Route exact path="/kits" component={ Kits } />
						<Route exact path="/edit-kit" component={ EditKit } />
						<Route exact path="/edit-kit:id" component={ EditKit } />
						
						<Route exact path="/products" component={ Products } />
						<Route exact path="/edit-product" component={ EditProduct } />
						<Route exact path="/edit-product:id" component={ EditProduct } />
					</Layout>
				</Router>
			</Provider>
		);
	}
}

export default App;
