import React, { useEffect, useState } from "react";
import * as crewLaborWageApi from "../../api/crewLaborWageApi";
import * as dateUtility from "../../utility/dateUtility";

function CrewLaborWagePage() {
	const [wages, setWages] = useState([]);

	useEffect(() => {
		crewLaborWageApi.getWages().then((_wages) => setWages(_wages.data));
	}, []);

	function renderRow(wage) {
		return (
			<tr key={wage.id}>
				<td>{wage.id}</td>
				<td>{dateUtility.formatDate(wage.effectiveDate)}</td>
				<td>{wage.wage.toFixed(2)}</td>
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
				not delete historical records as they are used for calculating
				accurate values for adjustments.
			</p>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Effective Date</th>
						<th>Wage</th>
					</tr>
				</thead>
				<tbody>{wages.map(renderRow)}</tbody>
			</table>
		</>
	);
}

export default CrewLaborWagePage;
