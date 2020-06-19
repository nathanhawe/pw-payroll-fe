import {
	handleResponse,
	handleError,
	retrieveAccessToken,
	retrieveSubject,
} from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/ApplicationUserProfile/";

export async function getApplicationUserProfile() {
	let accessToken = retrieveAccessToken();
	let subject = retrieveSubject();

	return fetch(`${baseUrl}${subject}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then(handleResponse)
		.catch(handleError);
}
