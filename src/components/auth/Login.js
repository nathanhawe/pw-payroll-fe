import React from "react";
import { AuthenticationConsumer } from "../../providers/AuthenticationProvider";

export const Login = () => (
	<AuthenticationConsumer>
		{({ signinRedirect }) => {
			signinRedirect();
			return <span>loading</span>;
		}}
	</AuthenticationConsumer>
);
