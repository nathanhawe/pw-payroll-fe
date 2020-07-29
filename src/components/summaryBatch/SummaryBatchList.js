import React from "react";
import PropTypes from "prop-types";
import * as dateUtility from "../../utility/dateUtility";

function SummaryBatchList(props) {
	const renderRow = (batch) => {
		return (
			<tr key={batch.id}>
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
							"https://gerawan.quickbase.com/db/bk9rc7cxs?a=dr&rid=" +
							batch.layoffId
						}
					>
						{batch.layoffId}
					</a>
				</td>
				<td>{dateUtility.formatDateAndTime(batch.dateCreated)}</td>
				<td>{dateUtility.formatDateAndTime(batch.startDate)}</td>
				<td>{dateUtility.formatDateAndTime(batch.endDate)}</td>
				<td>
					{batch.isComplete ? (
						<span className="alert alert-success">Yes</span>
					) : (
						<span className="alert alert-warning">No</span>
					)}
				</td>
				<td>{batch.owner}</td>
			</tr>
		);
	};

	return (
		<>
			<h2>Summary Creation History</h2>
			<div className="mx-4">
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Company</th>
							<th>Week End Date</th>
							<th>Layoff ID</th>
							<th>Date Created</th>
							<th>Started</th>
							<th>Completed</th>
							<th>Is Complete</th>
							<th>Owner</th>
						</tr>
					</thead>
					<tbody>{props.batches.map(renderRow)}</tbody>
				</table>
			</div>
		</>
	);
}

SummaryBatchList.propTypes = {
	batches: PropTypes.array.isRequired,
};

export default SummaryBatchList;
