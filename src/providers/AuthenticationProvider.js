// Lots of help from https://medium.com/@franciscopa91/how-to-implement-oidc-authentication-with-react-context-api-and-react-router-205e13f2d49

import React, { Component } from "react";
import AuthenticationService from "../services/AuthenticationService";

export const AuthenticationContext = React.createContext({
	signinRedirectCallback: () => ({}),
	logout: () => ({}),
	signoutRedirectCallback: () => ({}),
	isAuthenticated: () => ({}),
	signinRedirect: () => ({}),
	signinSilentCallback: () => ({}),
	createSigninRequest: () => ({}),
	getFullName: () => ({}),
	userCanView: (entity) => ({}),
	userCanManage: (entity) => ({}),
	getUserAccessLevel: () => ({}),
});

export const AuthenticationConsumer = AuthenticationContext.Consumer;

export class AuthenticationProvider extends Component {
	authenticationService;
	constructor(props) {
		super(props);
		this.authenticationService = new AuthenticationService();
	}

	render() {
		return (
			<AuthenticationContext.Provider value={this.authenticationService}>
				{this.props.children}
			</AuthenticationContext.Provider>
		);
	}
}
