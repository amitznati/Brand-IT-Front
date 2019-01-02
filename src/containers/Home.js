import React, { Component } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
//import Content from './components/Content';
import EditTemplate from './editTemplate/EditTemplate';

export default class Home extends Component {
    render() {
        return (
            <div>
				<Header />
				<SideBar />
				<EditTemplate />
            </div>
        );
    }
}