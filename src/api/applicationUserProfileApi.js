import {
	handleResponse,
	handleError,
	retrieveAccessToken,
	retrieveSubject,
	retrieveFullName,
	retrieveEmail,
} from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/ApplicationUserProfile/";

export async function getApplicationUserProfile() {
	let accessToken = retrieveAccessToken();
	let subject = retrieveSubject();
	let name = retrieveFullName();
	let email = retrieveEmail();

	return fetch(`${baseUrl}${subject}?email=${email}&name=${name}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then(handleResponse)
		.catch(handleError);
}
