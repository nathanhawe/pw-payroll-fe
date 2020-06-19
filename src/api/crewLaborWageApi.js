import { handleResponse, handleError, retrieveAccessToken } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/crewLaborWage/";

export async function getWages() {
	let accessToken = retrieveAccessToken();

	return fetch(baseUrl, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then(handleResponse)
		.catch(handleError);
}
