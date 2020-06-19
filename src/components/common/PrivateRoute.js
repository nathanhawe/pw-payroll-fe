import React from "react";
import { Route } from "react-router-dom";
import { AuthenticationConsumer } from "../../providers/AuthenticationProvider";

export const PrivateRoute = ({ component, ...rest }) => {
	const renderFn = (Component) => (props) => (
		<AuthenticationConsumer>
			{({ isAuthenticated, signinRedirect }) => {
				if (!!Component && isAuthenticated()) {
					return <Component {...props} />;
				} else {
					signinRedirect();
					return <span>loading</span>;
				}
			}}
		</AuthenticationConsumer>
	);

	return <Route {...rest} render={renderFn(component)} />;
};
