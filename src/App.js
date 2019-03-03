import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
//import {mockService} from './mocks';
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
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		data: {}
	// 	};
	// }
	// componentDidMount() {
	// 	this.hydrateStateWithLocalStorage();
	
	// 	// add event listener to save state to localStorage
	// 	// when user leaves/refreshes the page
	// 	window.addEventListener(
	// 		'beforeunload',
	// 		this.saveStateToLocalStorage.bind(this)
	// 	);
	// }
	
	// componentWillUnmount() {
	// 	window.removeEventListener(
	// 		'beforeunload',
	// 		this.saveStateToLocalStorage.bind(this)
	// 	);
	
	// 	// saves if component has a chance to unmount
	// 	this.saveStateToLocalStorage();
	// }
	
	// hydrateStateWithLocalStorage() {
	// 	// for all items in state
	// 	for (let key in this.state) {
	// 	// if the key exists in localStorage
	// 		if (localStorage.hasOwnProperty(key)) {
	// 			// get the key's value from localStorage
	// 			let value = localStorage.getItem(key);
		
	// 			// parse the localStorage string and setState
	// 			try {
	// 				value = JSON.parse(value);
	// 				this.setState({ [key]: value });
	// 			} catch (e) {
	// 			// handle empty string
	// 				this.setState({ [key]: value });
	// 			}
	// 		}
	// 	}
	// }
	
	// saveStateToLocalStorage() {
	// 	// for every item in React state
	// 	for (let key in this.state) {
	// 	// save to localStorage
	// 		localStorage.setItem(key, JSON.stringify(this.state[key]));
	// 	}
	// }

	// updateResourceStorage = (name,resourceList) => {
	// 	let {data} = this.state;
	// 	data[name] = resourceList;
	// 	this.setState({data});
	// }
	// createResource(name,payload) {
	// 	let data = this.getResourceList(name);
	// 	const id = data.reduce((crr, cur) => crr.id > cur.id) +1;
	// 	payload.id = id;
	// 	data.push(payload);
	// 	this.updateResourceStorage(name,data);
	// }
	// updateResource(name,payload) {
	// 	let data = this.getResourceList(name);
	// 	let newData = data.filter(r => r.id !== payload.id);
	// 	newData.push(payload);
	// 	this.updateResourceStorage(name,newData);
	// }
	// createOrUpdateResource = (name,payload) => {
	// 	if(payload.id) {
	// 		this.updateResource(name,payload);
	// 	} else {
	// 		this.createResource(name,payload);
	// 	}
	// }
	// getResourceList = (name) => {
	// 	const data = localStorage.getItem('data');
	// 	try {
	// 		const dataObj = JSON.parse(data);
	// 		if(!dataObj) {
	// 			return [];
	// 		}
	// 		return data[name] || [];
	// 	} catch (e) {
	// 		return [];
	// 	}
	// }
	
	render() {
		return (
			<Provider store = { store }>
				<Router>
					<Layout>
						<Route exact path="/" component={ Home } />
						<Route exact path="/edit-template" component={ EditTemplate } />

						<Route exact path="/themes" component={ Themes } />
						<Route exact path="/edit-theme" component={ EditTheme } />

						<Route exact path="/categories" component={ Categories } />
						<Route exact path="/edit-category" component={ EditCategory } />

						<Route exact path="/kits" component={ Kits } />
						<Route exact path="/edit-kit" component={ EditKit } />
						
						<Route exact path="/products" component={ Products } />
						<Route exact path="/edit-product" component={ EditProduct } />
					</Layout>
				</Router>
			</Provider>
		);
	}
}

export default App;
