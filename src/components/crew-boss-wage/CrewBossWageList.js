import React from "react";
import PropTypes from "prop-types";
import * as dateUtility from "../../utility/dateUtility";

function CrewBossWageList(props) {
	function renderRow(wage) {
		return (
			<tr key={wage.id}>
				<td>{wage.id}</td>
				<td>{wage.workerCountThreshold}</td>
				<td>{dateUtility.formatDate(wage.effectiveDate)}</td>
				<td>{wage.wage.toFixed(2)}</td>
				<td>
					{props.canEdit ? (
						<button
							aria-label="Edit"
							className="btn btn-outline-warning"
							onClick={(e) => props.handleEdit(wage, e)}
						>
							<i className="bi bi-pencil" aria-hidden="true"></i>
							&nbsp;Edit
						</button>
					) : (
						""
					)}
				</td>
			</tr>
		);
	}

	return (
		<>
			<p>
				Crew boss wages are determined based on location and worker
				count. South crew bosses are paid a flat daily or hourly rate
				which is already programmed into the time and attendance
				calculations. Crew boss wages for East and West crews are based
				on worker count and configured using the table below. There may
				be multiple values per worker count representing multiple
				effective dates and old records should not be deleted to ensure
				that adjustments can be calculated accurately for historical
				time periods.
			</p>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Worker Count Threshold</th>
						<th>Effective Date</th>
						<th>Wage</th>
						<th>
							{props.canEdit ? (
								<button
									aria-label="Add New"
									className="btn btn-outline-success"
									onClick={(e) => props.handleAdd()}
								>
									<i
										className="bi bi-plus-circle"
										aria-hidden="true"
									></i>
									&nbsp;Add New
								</button>
							) : (
								""
							)}
						</th>
					</tr>
				</thead>
				<tbody>{props.wages && props.wages.map(renderRow)}</tbody>
			</table>
		</>
	);
}

CrewBossWageList.propTypes = {
	wages: PropTypes.array.isRequired,
	canEdit: PropTypes.bool.isRequired,
	handleAdd: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
};

export default CrewBossWageList;
