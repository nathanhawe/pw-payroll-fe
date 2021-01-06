import moment from "moment";

export function formatDate(date) {
	if (date) return moment(date).format("M/D/YYYY");
}

export function formatDateForInput(date) {
	if (date) return moment(date).format("YYYY-MM-DD");
}

export function formatDateAndTime(date) {
	if (date) return moment.utc(date).local().format("M/D/YYYY h:mm A");
}
