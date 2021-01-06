import { handleResponse, handleError, retrieveAccessToken } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/crewLaborWage/";

export async function getWages(offset, limit) {
	let accessToken = retrieveAccessToken();

	return fetch(`${baseUrl}?offset=${offset}&limit=${limit}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then(handleResponse)
		.catch(handleError);
}

export async function saveCrewLaborWage(wage) {
	let accessToken = retrieveAccessToken();

	return fetch(baseUrl + (wage.id || ""), {
		method: wage.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			...wage,
			// Parse numbers in case they are sent as strings
			wage: parseFloat(wage.wage),
		}),
	})
		.then(handleResponse)
		.catch(handleError);
}

export async function deleteCrewLaborWage(wage) {
	let accessToken = retrieveAccessToken();

	return fetch(baseUrl + wage.id, {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then(handleResponse)
		.catch(handleError);
}
