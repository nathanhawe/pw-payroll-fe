import { handleResponse, handleError, retrieveAccessToken } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/minimumWage/";

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
