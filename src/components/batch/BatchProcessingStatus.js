import React from "react";
import PropTypes from "prop-types";
import * as dateUtility from "../../utility/dateUtility";

function BatchProcessingStatus(props) {
	const statusText = (statusCode) => {
		switch (statusCode) {
			case 0:
				return "Not Started";
			case 1:
				return "Preparing to Start Calculations";
			case 2:
				return "Downloading Data from Quick Base";
			case 3:
				return "Calculating Crew Boss Pay";
			case 4:
				return "Calculating Initial Gross";
			case 5:
				return "Calculating Paid Sick Leave";
			case 6:
				return "Calculating OT/DT/WOT/NPT/Minimum Makeup";
			case 7:
				return "Calculating Adjustments";
			case 8:
				return "Calculating Summaries";
			case 9:
				return "Uploading Completed Data to Quick Base";
			case 10:
				return "Completed Successfully";
			case 11:
				return "Failed";
			default:
				return "Unknown";
		}
	};

	const statusClassName = () => {
		if (props && props.batch && props.batch.processingStatus) {
			switch (props.batch.processingStatus) {
				case 11:
					return "alert alert-danger";
				case 10:
					return "alert alert-success";
				default:
					break;
			}
		}
		return "alert alert-info";
	};

	return (
		<h2 className={statusClassName()}>
			Current Status:{" "}
			{props.batch &&
				statusText(props.batch.processingStatus) +
					" (updated at " +
					dateUtility.formatDateAndTime(props.batch.dateModified) +
					")"}
		</h2>
	);
}

BatchProcessingStatus.propTypes = {
	batch: PropTypes.object.isRequired,
};

BatchProcessingStatus.defaultProps = {
	batch: {},
};

export default BatchProcessingStatus;
