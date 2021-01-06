import React from "react";
import PropTypes from "prop-types";
import * as dateUtility from "../../utility/dateUtility";

function CrewLaborWageList(props) {
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
				Crew labor wages are typically set higher than minimum wage.
				This table displays the wage and effective dates used for
				calculating the crew labor rate in the time and attendance
				calculations. If the effective crew labor rate is less than
				minimum wage for the same date, minimum wage will be used. Do
				not delete or modify historical records as they are used for
				calculating accurate values for adjustments.
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

CrewLaborWageList.propTypes = {
	wages: PropTypes.array.isRequired,
	canEdit: PropTypes.bool.isRequired,
	handleAdd: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
};

export default CrewLaborWageList;
