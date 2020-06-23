import moment from "moment";

export function formatDate(date) {
	if (date) return moment(date).format("M/D/YYYY");
}

export function formatDateAndTime(date) {
	if (date) return moment.utc(date).local().format("M/D/YYYY h:mm A");
}
