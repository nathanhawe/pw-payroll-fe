import { handleResponse, handleError, retrieveAccessToken } from "./apiUtils";
const baseUrl =
	process.env.REACT_APP_API_URL + "/api/summaryBatchProcessingStatus/";

export async function getCurrentStatus() {
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
