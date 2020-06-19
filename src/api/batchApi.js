import { handleResponse, handleError, retrieveAccessToken } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/batch/";

export async function getBatches() {
	let accessToken = retrieveAccessToken();

	return fetch(baseUrl, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then(handleResponse)
		.catch(handleError);
}

export async function saveBatch(batch) {
	let accessToken = retrieveAccessToken();

	return fetch(baseUrl + (batch.id || ""), {
		method: batch.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			...batch,
			// Parse layoffId to a number (in case it was sent as a string).
			layoffId: batch.layoffId ? parseInt(batch.layoffId, 10) : null,
		}),
	})
		.then(handleResponse)
		.catch(handleError);
}
