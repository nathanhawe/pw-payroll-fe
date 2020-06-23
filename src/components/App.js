import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticationProvider } from "../providers/AuthenticationProvider";

import Header from "./common/Header";
import BatchPage from "./batch/BatchPage";
import CrewBossWagePage from "./crew-boss-wage/CrewBossWagePage";
import CrewLaborWagePage from "./crew-labor-wage/CrewLaborWagePage";
import MinimumWagePage from "./minimum-wage/MinimumWagePage";
import NotFoundPage from "./NotFoundPage";
import HomePage from "./home/HomePage";

import { PrivateRoute } from "./common/PrivateRoute";
import { LogoutCallback } from "./auth/LogoutCallback";
import { Callback } from "./auth/Callback";
import { Logout } from "./auth/Logout";
import { SilentRenew } from "./auth/SilentRenew";
import { Login } from "./auth/Login";

function App() {
	return (
		<div className="container-fluid">
			<AuthenticationProvider>
				<Router>
					<Header />
					<Switch>
						<Route path="/" component={HomePage} exact />
						<Route path="/signin-oidc" component={Callback} exact />
						<Route path="/logout" component={Logout} exact />
						<Route
							path="/logout/callback"
							component={LogoutCallback}
							exact
						/>
						<Route
							path="/silentrenew"
							component={SilentRenew}
							exact
						/>
						<Route
							path="/signout-callback-oidc"
							component={HomePage}
							exact
						/>
						<Route path="/login" component={Login} exact />

						<PrivateRoute path="/batch" component={BatchPage} />
						<PrivateRoute
							path="/crew-boss-wage"
							component={CrewBossWagePage}
						/>
						<PrivateRoute
							path="/crew-labor-wage"
							component={CrewLaborWagePage}
						/>
						<PrivateRoute
							path="/minimum-wage"
							component={MinimumWagePage}
						/>
						<Route component={NotFoundPage} />
					</Switch>
				</Router>
			</AuthenticationProvider>
		</div>
	);
}
export default App;