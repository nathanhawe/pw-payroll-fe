import React from "react";
import PropTypes from "prop-types";
import * as dateUtility from "../../utility/dateUtility";

function AuditLockBatchList(props) {
	const statusText = (statusCode) => {
		switch (statusCode) {
			case 0:
				return "Not Started";
			case 1:
				return "Preparing to Start Summaries";
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

	const renderRow = (batch) => {
		return (
			<tr
				key={batch.id}
				className={batch.isComplete ? "" : "alert alert-warning"}
			>
				<td>{batch.id}</td>
				<td>
					{batch.company === "P"
						? "Plants"
						: batch.company === "R"
						? "Ranches"
						: ""}
				</td>
				<td>{dateUtility.formatDate(batch.weekEndDate)}</td>
				<td>
					<a
						target="_new"
						href={
							"https://prima.quickbase.com/db/bk9rc7cxs?a=dr&rid=" +
							batch.layoffId
						}
					>
						{batch.layoffId}
					</a>
				</td>
				<td>{batch.lock ? <span>Lock</span> : <span>Unlock</span>}</td>

				<td>{dateUtility.formatDateAndTime(batch.startDate)}</td>
				<td>{dateUtility.formatDateAndTime(batch.endDate)}</td>
				<td>
					{batch.isComplete ? (
						<span className="alert alert-success">Yes</span>
					) : (
						<span className="alert alert-warning">No</span>
					)}
				</td>
				<td>
					{statusText(batch.processingStatus)}
					{batch.processingStatus === 11
						? " - " + batch.statusMessage
						: ""}
				</td>
			</tr>
		);
	};

	return (
		<>
			<h2>Recent Audit Lock Actions</h2>
			<div className="mx-4">
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Company</th>
							<th>Week End Date</th>
							<th>Layoff ID</th>
							<th>Action</th>
							<th>Started</th>
							<th>Completed</th>
							<th>Is Complete</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>{props.batches.map(renderRow)}</tbody>
				</table>
			</div>
		</>
	);
}

AuditLockBatchList.propTypes = {
	batches: PropTypes.array.isRequired,
};

export default AuditLockBatchList;
