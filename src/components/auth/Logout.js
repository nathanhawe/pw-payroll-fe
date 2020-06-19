import React from "react";
import { AuthenticationConsumer } from "../../providers/AuthenticationProvider";

export const Logout = () => (
	<AuthenticationConsumer>
		{({ logout }) => {
			logout();
			return <span>loading</span>;
		}}
	</AuthenticationConsumer>
);
