import React from "react";
import { AuthenticationConsumer } from "../../providers/AuthenticationProvider";

export const SilentRenew = () => (
	<AuthenticationConsumer>
		{(signinSilentCallback) => {
			signinSilentCallback();
			return <span>loading</span>;
		}}
	</AuthenticationConsumer>
);
