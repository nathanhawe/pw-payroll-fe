import React, { useEffect, useState } from "react";
import * as minimumWageApi from "../../api/minimumWageApi";
import * as dateUtility from "../../utility/dateUtility";

function MinimumWagePage() {
	const [wages, setWages] = useState([]);

	useEffect(() => {
		minimumWageApi.getWages().then((_wages) => setWages(_wages.data));
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
					</tr>
				</thead>
				<tbody>{wages && wages.map(renderRow)}</tbody>
			</table>
		</>
	);
}

export default MinimumWagePage;
