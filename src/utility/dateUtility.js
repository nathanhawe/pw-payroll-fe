import moment from "moment";

export function formatDate(date) {
	return moment(date).format("M/D/YYYY");
}

export function formatDateAndTime(date) {
	return moment(date).format("M/D/YYYY h:mm A");
}
