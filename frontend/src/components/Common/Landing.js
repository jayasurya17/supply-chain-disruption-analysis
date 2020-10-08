import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Landing extends Component {

	render() {
		if (this.props.location.pathname === '/') {
			return (<Redirect to="/admin/dashboard" />);
		}
		return (null);
	}

}
//export Landing Component
export default Landing;