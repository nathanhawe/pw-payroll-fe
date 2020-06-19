import React from "react";
import { AuthenticationConsumer } from "../../providers/AuthenticationProvider";

export const LogoutCallback = () => (
	<AuthenticationConsumer>
		{({ signoutRedirectCallback }) => {
			signoutRedirectCallback();
			return <span>loading</span>;
		}}
	</AuthenticationConsumer>
);
