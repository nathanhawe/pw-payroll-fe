import React from "react";
import { AuthenticationConsumer } from "../../providers/AuthenticationProvider";

export const Callback = () => (
	<AuthenticationConsumer>
		{({ signinRedirectCallback }) => {
			signinRedirectCallback();
			return <span>loading</span>;
		}}
	</AuthenticationConsumer>
);
