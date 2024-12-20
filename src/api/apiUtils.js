import { IDENTITY_CONFIG } from "../utility/authConst";
export async function handleResponse(response) {
	if (response.status === 204) return {};
	if (response.ok || response.status === 400) return response.json();
	if (response.status === 401)
		return {
			errors: {
				Unauthorized: ["You are not authorized to take that action."],
			},
		};
	// if (response.status === 400) {
	// 	// So, a server-side validation error occurred.
	// 	// Server side validation returns a string error message, so parse as text instead of json.
	// 	throw new Error(error);
	// }
	throw new Error("Network response was not ok.");
}

export function retrieveAccessToken() {
	const oidcStorage = getOidcStorage();
	return !!oidcStorage && !!oidcStorage.access_token
		? oidcStorage.access_token
		: "";
}

export function retrieveSubject() {
	const oidcStorage = getOidcStorage();
	return !!oidcStorage && !!oidcStorage.profile && !!oidcStorage.profile.sub
		? oidcStorage.profile.sub
		: "";
}

export function retrieveFullName() {
	const oidcStorage = getOidcStorage();

	let givenName =
		!!oidcStorage &&
		!!oidcStorage.profile &&
		!!oidcStorage.profile.given_name
			? oidcStorage.profile.given_name
			: "";
	let familyName =
		!!oidcStorage &&
		!!oidcStorage.profile &&
		!!oidcStorage.profile.family_name
			? oidcStorage.profile.family_name
			: "";
	let fullName = `${givenName} ${familyName}`;
	return fullName.trim();
}

export function retrieveEmail() {
	const oidcStorage = getOidcStorage();
	return !!oidcStorage && !!oidcStorage.profile && !!oidcStorage.profile.email
		? oidcStorage.profile.email
		: "";
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
	// eslint-disable-next-line no-console
	console.error("API call failed. " + error);
	throw error;
}

function getOidcStorage() {
	return JSON.parse(
		sessionStorage.getItem(
			`oidc.user:${IDENTITY_CONFIG.authority}:${IDENTITY_CONFIG.client_id}`
		)
	);
}
