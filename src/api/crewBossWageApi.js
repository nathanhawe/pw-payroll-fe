import { handleResponse, handleError, retrieveAccessToken } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/crewBossWage/";

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

export async function saveCrewBossWage(wage) {
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
			workerCountThreshold: parseInt(wage.workerCountThreshold),
			wage: parseFloat(wage.wage),
		}),
	})
		.then(handleResponse)
		.catch(handleError);
}

export async function deleteCrewBossWage(wage) {
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
