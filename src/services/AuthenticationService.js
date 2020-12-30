import { IDENTITY_CONFIG } from "../utility/authConst";
import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import * as applicationUserProfileApi from "../api/applicationUserProfileApi";
import { ENTITY } from "../utility/entityConst";
import { ACCESS_LEVEL } from "../utility/accessLevelConst";

export default class AuthenticationService {
	UserManager;

	constructor() {
		this.UserManager = new UserManager({
			...IDENTITY_CONFIG,
			response_mode: "query",
			userStore: new WebStorageStateStore({
				store: window.sessionStorage,
			}),
			//metadata: {}
		});

		Log.logger = console;
		if (process.env.NODE_ENV === "development") {
			Log.level = Log.DEBUG;
		} else {
			Log.level = Log.ERROR;
		}

		/* userLoaded event is raised when user session has been established or re-established.  
		This callback is not triggered when UserManager.GetUser() is initially called and loaded
		from memory but is raised on signin callbacks. */
		this.UserManager.events.addUserLoaded((user) => {
			this.getApplicationUser().then(() => {
				if (window.location.href.indexOf("signin-oidc") !== -1) {
					this.navigateToScreen();
				}
			});
		});

		// userUnloaded event is raised when a user session has been terminated
		// this.UserManager.events.addUserUnloaded(()=>{});

		// accessTokenExpiring event is raised prior to the access token expiring.
		// this.UserManager.events.addAccessTokenExpiring(()=>{});

		// accessTokenExpired is raised after the access token has expired.
		this.UserManager.events.addAccessTokenExpired(() => {
			this.signinSilent();
		});

		// silentRenewError is raised when the automatic silent renew has failed.
		this.UserManager.events.addSilentRenewError((e) => {
			console.log("Silent renew error", e.message);
		});

		// userSignedOut is raised when the user's sign-in status at the OP has changed.
		this.UserManager.events.addUserSignedOut((e) => {
			this.signinRedirect();
		});
	}

	// Handles the signin callback when the identity provider calls the signin-oidc endpoint
	signinRedirectCallback = () => {
		this.UserManager.signinRedirectCallback().then(() => {
			"";
		});
	};

	// getUser = async () => {
	//   const user = await this.UserManager.getUser();
	//   if (!user) {
	//     return await this.UserManager.signinRedirectCallback();
	//   }
	//   return user;
	// };

	// parseJwt = (token) => {
	//   const base64Url = token.split(".")[1];
	//   const base64 = base64Url.replace("-", "+").replace("_", "/");
	//   return JSON.parse(window.atob(base64));
	// };

	// Stores the current location and redirects to the identity provider's sign in.
	signinRedirect = () => {
		localStorage.setItem("redirectUri", window.location.pathname);
		this.UserManager.signinRedirect({});
	};

	// Navigates to the private (authentication required) section of the website.
	navigateToScreen = () => {
		window.location.replace("/");
	};

	// Returns true if session storage has an access token.
	isAuthenticated = () => {
		const oidcStorage = JSON.parse(
			sessionStorage.getItem(
				`oidc.user:${IDENTITY_CONFIG.authority}:${IDENTITY_CONFIG.client_id}`
			)
		);
		return !!oidcStorage && !!oidcStorage.access_token;
	};

	// Attempts to silently login a user (such as when a token expires)
	signinSilent = () => {
		this.UserManager.signinSilent()
			.then((user) => {
				console.log("signed in", user);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	signinSilentCallback = () => {
		this.UserManager.signinSilentCallback();
	};

	createSigninRequest = () => {
		return this.UserManager.createSigninRequest();
	};

	logout = () => {
		localStorage.removeItem("applicationUser");
		this.UserManager.signoutRedirect({
			id_token_hint: localStorage.getItem("id_token"),
		});
		this.UserManager.clearStaleState();
	};

	signoutRedirectCallback = () => {
		this.UserManager.signoutRedirectCallback().then(() => {
			localStorage.clear();
			window.location.replace("/");
		});
		this.UserManager.clearStaleState();
	};

	// Returns the formatted full name based on the identity token claims.
	getFullName = () => {
		const oidcStorage = JSON.parse(
			sessionStorage.getItem(
				`oidc.user:${IDENTITY_CONFIG.authority}:${IDENTITY_CONFIG.client_id}`
			)
		);

		let name = (
			(oidcStorage ? oidcStorage.profile.given_name : "") +
			" " +
			(oidcStorage ? oidcStorage.profile.family_name : "")
		).trim();
		return name;
	};

	// Retrieves the application user from API
	getApplicationUser = async () => {
		let applicationUser = await applicationUserProfileApi.getApplicationUserProfileFromSubject();
		localStorage.setItem(
			"applicationUser",
			JSON.stringify(applicationUser.data)
		);
	};

	// Returns the current user's access level or blank if there is no authenticated user.
	getUserAccessLevel = () => {
		let applicationUser = JSON.parse(
			localStorage.getItem("applicationUser")
		);
		if (applicationUser && applicationUser.accessLevel) {
			return applicationUser.accessLevel;
		} else return "";
	};

	userCanView = (entity) => {
		let accessLevel = this.getUserAccessLevel();
		switch (accessLevel) {
			case ACCESS_LEVEL.viewer:
			case ACCESS_LEVEL.batchCreator:
				if (entity === ENTITY.user) return false;
				return true;
			case ACCESS_LEVEL.administrator:
				return true;
			default:
				return false;
		}
	};

	userCanManage = (entity) => {
		let accessLevel = this.getUserAccessLevel();
		switch (accessLevel) {
			case ACCESS_LEVEL.batchCreator:
				if (entity === ENTITY.batch) return true;
				return false;
			case ACCESS_LEVEL.administrator:
				return true;
			default:
				return false;
		}
	};
}
