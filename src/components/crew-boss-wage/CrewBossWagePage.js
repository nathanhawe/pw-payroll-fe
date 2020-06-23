import React, { useEffect, useState } from "react";
import * as crewBossWageApi from "../../api/crewBossWageApi";
import * as dateUtility from "../../utility/dateUtility";

function CrewBossWagePage() {
	const [wages, setWages] = useState([]);

	useEffect(() => {
		crewBossWageApi.getWages().then((_wages) => setWages(_wages.data));
	}, []);

	function renderRow(wage) {
		return (
			<tr key={wage.id}>
				<td>{wage.id}</td>
				<td>{wage.workerCountThreshold}</td>
				<td>{dateUtility.formatDate(wage.effectiveDate)}</td>
				<td>{wage.wage.toFixed(2)}</td>
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
					</tr>
				</thead>
				<tbody>{wages && wages.map(renderRow)}</tbody>
			</table>
		</>
	);
}

export default CrewBossWagePage;
