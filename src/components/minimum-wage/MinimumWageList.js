import React from "react";
import PropTypes from "prop-types";
import * as dateUtility from "../../utility/dateUtility";

function MinimumWageList(props) {
	function renderRow(wage) {
		return (
			<tr key={wage.id}>
				<td>{wage.id}</td>
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
				Minimum wage is determined by using this table to select the
				effective minimum wage on any given date. Do not delete old
				records from this table as they are used when calculating
				adjustments. To set a new minimum wage value simply create a new
				record and set the effective date to the date that wage goes
				into effect.
			</p>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
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

MinimumWageList.propTypes = {
	wages: PropTypes.array.isRequired,
	canEdit: PropTypes.bool.isRequired,
	handleAdd: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
};

export default MinimumWageList;
