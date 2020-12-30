import {
	handleResponse,
	handleError,
	retrieveAccessToken,
	retrieveSubject,
	retrieveFullName,
	retrieveEmail,
} from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/ApplicationUserProfile/";

export async function getApplicationUserProfileFromSubject() {
	let accessToken = retrieveAccessToken();
	let subject = retrieveSubject();
	let name = retrieveFullName();
	let email = retrieveEmail();

	return fetch(
		`${baseUrl}FromSubject/${subject}?email=${email}&name=${name}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	)
		.then(handleResponse)
		.catch(handleError);
}

export async function getApplicationUserProfiles(offset, limit) {
	let accessToken = retrieveAccessToken();

	return fetch(`${baseUrl}?offset=${offset}&limit=${limit}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then(handleResponse)
		.catch(handleError);
}

export async function saveApplicationUserProfile(user) {
	let accessToken = retrieveAccessToken();

	return fetch(baseUrl + (user.id || ""), {
		method: user.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			...user,
		}),
	})
		.then(handleResponse)
		.catch(handleError);
}
